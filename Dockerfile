FROM node:14.9.0-alpine as BUILD

WORKDIR /usr/src/app
COPY . .

ARG NPM_TOKEN
RUN echo "@valienta:registry=https://npm.pkg.github.com/valienta" > .npmrc \
      && echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" >> .npmrc

RUN npm ci

RUN npm run build

# Test stage
FROM node:14.9.0-alpine as TEST

WORKDIR /usr/src/app

COPY --from=BUILD /usr/src/app/ ./

RUN npm test

# Production image stage
FROM node:14.9.0-alpine as PROD

WORKDIR /usr/src/app

COPY --from=BUILD /usr/src/app/package.json ./package.json
COPY --from=BUILD /usr/src/app/node_modules/ ./node_modules/
COPY --from=BUILD /usr/src/app/dist/src/ ./dist/

RUN npm prune --production

ENTRYPOINT [ "node", "dist/server.js" ]

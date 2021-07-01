import { UNAUTHORIZED, OK } from 'http-status-codes';
import crypto, { Hmac } from 'crypto';
import { BaseContext } from 'koa';
import config from '../config';
import logger from '../logger';

function getHmac(body: string): string {
  const hmac: Hmac = crypto.createHmac('sha256', config.hmacSecret);
  const hashedBody: Hmac = hmac.update(body);

  return hashedBody.digest('hex');
}

async function handler(ctx: BaseContext, next: Function) {
  const authorizationHeader: string = ctx.get('Authorization');

  if (authorizationHeader === '') {
    ctx.status = UNAUTHORIZED;
    ctx.body = { message: 'You are not authorized to access this resource' };

    logger.warn('[hmacMiddleware] No authorization header found');

    return;
  }

  const incomingHmac: string = authorizationHeader.trim();

  if (incomingHmac === '') {
    ctx.status = UNAUTHORIZED;
    ctx.body = { message: 'You are not authorized to access this resource' };

    logger.warn('[hmacMiddleware] Authorization header is empty');

    return;
  }

  const dataToHash: string = ctx.request.method !== 'GET' ? JSON.stringify(ctx.request.body) : ctx.request.method;

  const calculatedHmac: string = getHmac(dataToHash);

  if (incomingHmac !== calculatedHmac) {
    ctx.status = UNAUTHORIZED;
    ctx.body = { message: 'You are not authorized to access this resource' };

    logger.warn('[hmacMiddleware] HMAC signatures do not match');

    return;
  }

  await next();
}

export default handler;

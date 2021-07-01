require('newrelic');

/* eslint-disable import/first */
import Koa from 'koa';
import * as swagger from 'swagger2';
import { ui, validate } from 'swagger2-koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import { createConnection } from 'typeorm';
import loggingMiddleware from './middleware/loggingMiddleware';
import routes from './routes';
import errorHandler from './middleware/errorHandler';
import config from './config';
import logger from './logger';
import Cors from '@koa/cors';
/* eslint-enable import/first */

const app = new Koa();
const swaggerDocument: any = swagger.loadDocumentSync(`${__dirname}/swagger/v1/v1.yaml`);

app.use(Cors());

// Provides important security headers to make your app more secure
app.use(helmet());

// Logger middleware -> use winston as logger (logging.ts with config)
app.use(loggingMiddleware);

// Enable bodyParser with default options
app.use(bodyParser());

// eslint-disable-next-line global-require
const parameter = require('koa-parameter');

app.use(parameter(app));

app.use(errorHandler);

app.use(ui(swaggerDocument, '/docs'));

app.use(validate(swaggerDocument));

app.use(routes.routes());

createConnection({
  type: 'postgres',
  host: config.postgresDB.host,
  port: config.postgresDB.port,
  username: config.postgresDB.username,
  password: config.postgresDB.password,
  database: config.postgresDB.database,
  synchronize: config.postgresDB.synchronize,
  logging: false,
  entities: config.postgresDB.dbEntitiesPath,
  extra: {
    ssl: config.postgresDB.dbsslconn, // if not development, will use SSL
  }
}).then(async () => {
  app.listen(config.port);
  logger.info('\n\n');
  logger.info(`TypeORM connected to ${config.postgresDB.database}`);
  logger.info(`Server running on port ${config.port}`);
  logger.info('\n\n');
}).catch((error: any) => logger.error('TypeORM connection error: ', error));

export default app;

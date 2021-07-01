import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'test') {
  dotenv.config({ path: '.env' });
}

interface PostgresDBConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  dbsslconn: boolean;
  dbEntitiesPath: string[];
}

interface I99Minutos {
  apiUrl: string;
  apiKey: string;
}

export interface IConfig {
  port: number;
  hmacSecret: string;
  debugLogging: boolean;
  isDevMode: boolean;
  serviceName: string;
  postgresDB: PostgresDBConfig;
  _99minutos: I99Minutos;

}

const isDevMode = process.env.NODE_ENV === 'development';

const config: IConfig = {
  port: +process.env.PORT || 3000,
  hmacSecret: process.env.HMAC_SECRET || 'hmacSecret',
  debugLogging: isDevMode,
  isDevMode,
  serviceName: process.env.SERVICE_NAME || 'SHIPPING-SERVICE-API',
  postgresDB: {
    host: process.env.TYPEORM_HOST,
    port: +process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    dbsslconn: process.env.DATABASE_SSL_CONNECTION === 'true',
    dbEntitiesPath: [
      ...isDevMode ? ['src/domain/**/*.ts'] : ['dist/domain/**/*.js'],
    ],
  },
  _99minutos: {
    apiUrl: process.env.MINUTOS_URL_GUIDE || 'https://sandbox.99minutos.com/api/v1',
    apiKey: process.env.MINUTOS_API_KEY || '3e28b5017e2120fc217e694087f1cc1279ad041f'
  },
};

export default config;

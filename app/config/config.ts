import dotenv from 'dotenv';

dotenv.config();

interface Config {
  db: {
    databasePort: string;
    databaseHost: string;
    databaseUserName: string;
    databasePassword: string;
    databaseDialect: string;
    databaseName: string;
  };
  port: string | undefined;
  salt: string;
  nodeEnvironment: string;
  accessTokenKey: string;
  refreshTokenKey: string;
}

const config: Config = {
  db: {
    databasePort: process.env.DB_PORT!.toString(),
    databaseHost: process.env.DB_HOST!.toString(),
    databaseUserName: process.env.DB_USER!.toString(),
    databasePassword: process.env.DB_PASSWORD!.toString(),
    databaseDialect: process.env.DB_DIALECT!.toString(),
    databaseName: process.env.DB_DATABASE!.toString(),
  },
  port: process.env.PORT,
  salt: process.env.SALT ?? '10',
  nodeEnvironment: process.env.NODE_ENV!.toString(),
  accessTokenKey: process.env.ACCESS_TOKEN!.toString(),
  refreshTokenKey: process.env.REFRESH_TOKEN!.toString(),
};

export default config;
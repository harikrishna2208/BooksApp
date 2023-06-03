import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import expressPinoLogger from 'express-pino-logger';
import cookieParser from 'cookie-parser';
import config from './app/config/config';
import logger from './app/api/middleware/logger';
import routes from './app/api/routes';

const { port } = config;

dotenv.config();
const app = express();

app.use(cookieParser());

const loggerMiddleware = expressPinoLogger({
  logger,
  autoLogging: false,
});

app.use(loggerMiddleware);
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  }),
);

app.use('/', routes);

app.listen(port, () => {
  logger.info(`App running on port ${port}.`);
});

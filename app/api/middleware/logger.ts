import pino from 'pino';

const levels = {
  http: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

const logger = pino({
  customLevels: levels,
  useOnlyCustomLevels: true,
  transport: {
    targets: [
      {
        target: 'pino/file',
        level: 'error',
        options: {
          translateTime: 'SYS:standard',
        },
      },
      {
        target: 'pino-pretty',
        colorize: true,
        level: 'info',
        options: {
          ignore: 'pid,hostname',
          translateTime: 'SYS:standard',
        },
      },
    ],
  },
});

export default logger;

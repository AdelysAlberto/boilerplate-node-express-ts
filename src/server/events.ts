import process from 'process';
import config from '../config';
import { Server } from 'http';
import { TEnv } from '../config/types';

// @ts-ignore
import { logger } from '../lib';

const pkg = require('../../package.json');

// On server internal error.
const onServerError = (): void => logger.error({ message: `Server error` });

// On server start.
const onListen = (port: TEnv): void => {
  logger.info(`ᕕ(ಠ‿ಠ)ᕗ ${pkg.name}`);
  logger.info(`${pkg.name}:${pkg.version} - Running on port: ${port}`);
};

// When the process receive kill signal.
const onProcessKill = (server: Server): void => {
  logger.info('Service termination signal received');

  setTimeout(() => {
    logger.info('Finishing server');
    server.close(() => process.exit(0));
  }, 180);
};

// When in the server happen a uncaugth exception.
const onException = (err: any): void => logger.error({ message: err });

const modules = {
  onListen,
  onProcessKill,
  onServerError,
  onException,
};

export = modules;

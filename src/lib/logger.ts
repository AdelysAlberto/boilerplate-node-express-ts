const httpContext = require('express-http-context');
const { getCallerFile, getVersion } = require('./utils/callOrigin');

//Define numeric level number.
const levelMaps = {
  ALL: 0,
  DEBUG: 10,
  INFO: 20,
  WARN: 30,
  ERROR: 40,
};

/**
 * Generate a client and traceid object to be injected in log object.
 * @returns {object} {traceId,clientId}
 */
const traceInjector = () => {
  const trace = httpContext.get('traceId')
    ? {
        traceId: httpContext.get('traceId'),
      }
    : {};

  const client = httpContext.get('client')
    ? {
        client: httpContext.get('client'),
      }
    : {};

  return {
    ...trace,
    ...client,
  };
};

/**
 * Return a formatted log.
 * @param {string} level log description.
 * @param {object} value object or primitive to log.
 * @returns {}
 */
const format = (level, value) => ({
  type: level,
  code: levelMaps[level] || 0,
  version: getVersion(),
  time: new Date().toLocaleString(),
  logger: getCallerFile(),
  ...(typeof value === 'object' ? value : { message: value }),
  ...traceInjector(),
});

const colorFont = (color) => {
  const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    reset: '\x1b[0m',
  };
  return colors[color] || colors.reset;
};

/**
 * Return a formatted log.
 * @param {number} level log number level.
 * @param {string} code log description.
 * @param {object} value object or primitive to log.
 * @returns {object}
 */
const all = (value) => console.log(JSON.stringify(format('ALL', value)));

/**
 * Return a formatted log.
 * @param {number} level log number level.
 * @param {string} code log description.
 * @param {object} value object or primitive to log.
 * @returns {object}
 */
const debug = (value) => console.debug(`ಠ~ಠ`, JSON.stringify(format('DEBUG', value)));

/**
 * Return a formatted log.
 * @param {number} level log number level.
 * @param {string} code log description.
 * @param {object} value object or primitive to log.
 * @returns {object}
 */
const info = (value) => console.info('ϟ', colorFont('cyan'), `${JSON.stringify(format('INFO', value))}`, colorFont('reset'));

/**
 * Return a formatted log.
 * @param {number} level log number level.
 * @param {string} code log description.
 * @param {object} value object or primitive to log.
 * @returns {object}
 */
const warn = (value) => console.warn(`ಠ_ಠ `, colorFont('magenta'), JSON.stringify(format('WARN', value)), colorFont('reset'));

/**
 * @param value error to be logged
 * @param sentry sentry instance, if is not pass as param the log is not sent to sentry
 *
 *
 * @param {number} level log number level.
 * @param {string} code log description.
 * @param {object} value object or primitive to log.
 * @returns {object} Return a formatted log.
 */
const error = (value, sentry?) => {
  console.log(`✖_✖`, colorFont('red'), `${JSON.stringify(format('ERROR', value))}`, colorFont('reset'));
  sentry && sentry.captureException(value);
};

/**
 * @param {object} value object or primitive to log.
 * @returns {}
 */
const log = (value) => console.log(JSON.stringify(format('LOG', value)));

const logger = { traceInjector, log, all, debug, info, warn, error };

export = logger;

import { logger } from './index';

//Include sentry.
const sentry = require('@sentry/node');

//Get the env.
const env = process.env.NODE_ENV;

/**
 * Error handler middleware.
 * @param {object} error throwable error.
 * @param {object} req   request object.
 * @param {object} res   response object.
 * @param {object} next  next middleware.
 * @returns {Promise}.
 */
const errorHandler = (err, req, res, next) => {
  const staticError = 'Internal error';

  //Extract info from error object.
  const { statusCode, status, statusText, message } = err;

  //Get the status code.
  const statusHTTP = statusCode || status || 500;

  //Get the error detail.
  const detail = message || statusText || staticError;

  //Log in stderr and launch the exception to sentry.
  logger.error(
    {
      origin: 'Error handler',
      message: detail,
    },
    sentry
  );

  //Return error response, only to production env use the same message
  res.status(statusHTTP).json({
    status: statusHTTP,
    message: env === 'production' ? staticError : detail,
  });
};

export = errorHandler;

import { RequestHandler } from 'express';

import logger from '../logger';
import config from '../config/config';

/**
 * This router wrapper catches any error from async await
 * and throws it to the default express error handler,
 * instead of crashing the app
 *
 * @param handler Request handler to check for error
 */
const handleErrorMiddleware = (handler: RequestHandler): RequestHandler => async (req, res, next) => {
  handler(req, res, next).catch((err: Error) => {
    if (config.isDevelopment) {
      logger.log({
        level: 'error',
        message: 'Error in request handler',
        error: err,
      });
    }
    next(err);
  });
};

export default handleErrorMiddleware;

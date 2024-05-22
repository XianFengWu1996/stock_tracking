import { NextFunction, Request, Response } from 'express';
import { BaseError } from './baseError';
import { logger } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = async (err: Error, req: Request, res: Response, _: NextFunction) => {
  // all error class such as APIError, NotFoundError are all base on BaseError
  if (err instanceof BaseError) {
    const msg = err.serializeError();
    logger.error(err);
    return res.status(err.httpCode).json({
      error: {
        ...err,
        message: msg,
      },
    });
  }

  // if its not instance of BaseError, handle as an generic error
  logger.error(err);

  res.status(500).json({
    error: {
      name: err.name,
      httpCode: 500,
      message: err.message ?? 'Unknown error occurred',
    },
  });
};

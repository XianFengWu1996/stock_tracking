import { HttpStatusCodes } from '../interfaces/httpStatusCodes';
import { BaseError } from './baseError';

export class APIError extends BaseError {
  constructor(
    message = 'internal server error',
    httpCode = HttpStatusCodes.INTERNAL_SERVER,
    name = 'INTERNAL_SERVER_ERROR'
  ) {
    super(message, httpCode, name);
  }
}

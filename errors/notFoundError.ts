import { HttpStatusCodes } from '../interfaces/httpStatusCodes';
import { BaseError } from './baseError';

export class NotFoundError extends BaseError {
  constructor(
    message = 'Not found',
    httpCode = HttpStatusCodes.NOT_FOUND,
    name = 'NOT_FOUND_ERROR'
  ) {
    super(message, httpCode, name);
  }
}

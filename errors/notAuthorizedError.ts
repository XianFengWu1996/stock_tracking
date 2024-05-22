import { HttpStatusCodes } from '../interfaces/httpStatusCodes';
import { BaseError } from './baseError';

export class NotAuthroizedError extends BaseError {
  constructor(
    message = 'Not authorized',
    httpCode = HttpStatusCodes.NOT_AUTHROIZED,
    name = 'NOT_AUTHORIZED_ERROR'
  ) {
    super(message, httpCode, name);
  }
}

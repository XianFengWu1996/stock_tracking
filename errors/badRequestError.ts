import { HttpStatusCodes } from '../interfaces/httpStatusCodes';
import { BaseError } from './baseError';

export class BadRequestError extends BaseError {
  constructor(message = 'Bad Request Error', httpCode = HttpStatusCodes.BAD_REQUEST, name = 'BAD_REQUEST_ERROR') {
    super(message, httpCode, name);
  }
}

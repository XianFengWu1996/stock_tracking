import { HttpStatusCodes } from '../interfaces/httpStatusCodes';

export class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCodes;

  constructor(message: string, httpCode: HttpStatusCodes, name: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }
  serializeError() {
    return this.message;
  }
}

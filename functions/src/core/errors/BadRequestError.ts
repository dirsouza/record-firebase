import { BusinessError } from './BusinessError';

export class BadRequestError extends BusinessError {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    this.name = 'BadRequestError';
  }
}

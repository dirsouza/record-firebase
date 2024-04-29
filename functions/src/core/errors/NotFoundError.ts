import { BusinessError } from './BusinessError';

export class NotFoundError extends BusinessError {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 404;
    this.name = 'NotFoundError';
  }
}

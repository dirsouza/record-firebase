import { BusinessError } from './BusinessError';

export class ServerError extends BusinessError {
  public statusCode: number;

  constructor(stack: string) {
    super('Internal server error');
    this.statusCode = 500;
    this.name = 'ServerError';
    this.stack = stack;
  }
}

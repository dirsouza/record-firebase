export class BusinessError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'BusinessError';
    this.statusCode = 500;
  }
}

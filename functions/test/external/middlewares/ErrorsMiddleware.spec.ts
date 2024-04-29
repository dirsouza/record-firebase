import { describe, it, expect, vi } from 'vitest';
import { errorsMiddleware } from '../../../src/external/middlewares';
import { BadRequestError, NotFoundError } from '../../../src/core/errors';
import { BusinessError } from '../../../src/core/errors/BusinessError';

describe('ErrorsMiddlewares Test Suite', () => {
  const reqMock = {} as any;
  const resMock = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
  } as any;
  const nextMock = vi.fn();

  it('should return error 500 when the error is not of type BusinessError', () => {
    const errorMock = new Error('Any error');

    errorsMiddleware(errorMock, reqMock, resMock, nextMock);

    expect(resMock.status).toHaveBeenCalledWith(500);
    expect(resMock.json).toHaveBeenCalledWith(errorMock);
  });

  it('should return error 400 when the error is of type BadRequestError', () => {
    const errorMock = new BadRequestError('Any error');

    errorsMiddleware(errorMock, reqMock, resMock, nextMock);

    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith(errorMock);
  });

  it('should return error 404 when the error is of type NotFoundError', () => {
    const errorMock = new NotFoundError('Any error');

    errorsMiddleware(errorMock, reqMock, resMock, nextMock);

    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith(errorMock);
  });

  it('should return error 500 when the error is of type BusinessError', () => {
    const errorMock = new BusinessError('Any error');

    errorsMiddleware(errorMock, reqMock, resMock, nextMock);

    expect(resMock.status).toHaveBeenCalledWith(500);
    expect(resMock.json).toHaveBeenCalledWith(errorMock);
  });
});

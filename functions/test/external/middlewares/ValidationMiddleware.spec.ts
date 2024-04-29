import { describe, it, expect, vi, beforeEach } from 'vitest';
import { validationMiddleware } from '../../../src/external/middlewares';
import { BadRequestError } from '../../../src/core/errors';
import { ZodError } from 'zod';
import { ZodIssue } from 'zod/lib/ZodError';

describe('ValidationMiddleware Test Suite', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return error 400 when attempting to validate the received parameters', async () => {
    const errorMock = new BadRequestError(JSON.stringify({}));
    const reqMock = { body: {} } as any;
    const resMock = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as any;
    const nextMock = vi.fn();
    const optionsMock = {
      schema: { body: {} },
      type: 'body'
    } as any;

    await validationMiddleware(optionsMock)(reqMock, resMock, nextMock);

    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith(errorMock);
  });

  it('should return error 400 when validating the received parameters', async () => {
    const issueMock: ZodIssue[] = [
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'number',
        path: ['name'],
        message: 'Invalid input'
      }
    ];
    const zodErrorMock = new ZodError(issueMock);
    const reqMock = { body: { name: 'any_name' } } as any;
    const resMock = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as any;
    const nextMock = vi.fn();
    const optionsMock = {
      schema: { parseAsync: vi.fn().mockRejectedValueOnce(zodErrorMock) },
      type: 'body'
    } as any;

    await validationMiddleware(optionsMock)(reqMock, resMock, nextMock);

    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith({
      statusCode: 400,
      name: 'BadRequestError',
      errors: zodErrorMock.flatten().fieldErrors
    });
  });

  it('should call the next() function when validating the data', async () => {
    const reqMock = { body: { name: 'any_name' } } as any;
    const resMock = {} as any;
    const nextMock = vi.fn();
    const optionsMock = {
      schema: { parseAsync: vi.fn().mockResolvedValueOnce(reqMock.body) },
      type: 'body'
    } as any;

    await validationMiddleware(optionsMock)(reqMock, resMock, nextMock);

    expect(nextMock).toHaveBeenCalledWith();
  });
});

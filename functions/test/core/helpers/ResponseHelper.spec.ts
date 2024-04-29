import { describe, it, expect } from 'vitest';
import { BadRequestError } from '../../../src/core/errors';
import { created, errorResp, ok } from '../../../src/core/helpers';

describe('ResponseHelper Test Suite', () => {
  describe(`${errorResp.name}`, () => {
    it('should return the data of the thrown error', () => {
      const error = new BadRequestError('Any error message');
      expect(errorResp(error)).toEqual({
        status_code: error.statusCode,
        name: error.name,
        message: error.message
      });
    });
  });

  describe(`${created.name}`, () => {
    it('should return the statusCode 201', () => {
      const payload = { any: 'data' };
      expect(created(payload)).toEqual({
        status_code: 201,
        payload
      });
    });
  });

  describe(`${ok.name}`, () => {
    it('should return the statusCode 200', () => {
      const payload = { any: 'data' };
      expect(ok(payload)).toEqual({
        status_code: 200,
        payload
      });
    });
  });
});

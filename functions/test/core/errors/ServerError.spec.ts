import { describe, it, expect } from 'vitest';
import { ServerError } from '../../../src/core/errors';

describe(`${ServerError.name} Test Suite`, () => {
  const errorMock = new Error('Test Error');
  const sut = new ServerError(errorMock.stack);

  describe('constructor', () => {
    it('should create a new instance of ServerError', () => {
      expect(sut).toBeInstanceOf(ServerError);
    });
  });

  describe('properties', () => {
    it.each([
      { property: 'message', value: 'Internal server error' },
      { property: 'name', value: 'ServerError' },
      { property: 'statusCode', value: 500 }
    ])('should return the value $value of the property $property', ({ property, value }) => {
      expect(sut[property]).toBe(value);
    });
  });
});

import { describe, it, expect } from 'vitest';
import { BusinessError } from '../../../src/core/errors/BusinessError';

describe(`${BusinessError.name} Test Suite`, () => {
  const sut = new BusinessError('Test Error');

  describe('constructor', () => {
    it('should create a new instance of BusinessError', () => {
      expect(sut).toBeInstanceOf(BusinessError);
    });
  });

  describe('properties', () => {
    it.each([
      { property: 'message', value: 'Test Error' },
      { property: 'name', value: 'BusinessError' },
      { property: 'statusCode', value: 500 }
    ])('should return the value $value of the property $property', ({ property, value }) => {
      expect(sut[property]).toBe(value);
    });
  });
});

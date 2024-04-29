import { describe, it, expect } from 'vitest';
import { NotFoundError } from '../../../src/core/errors';

describe(`${NotFoundError.name} Test Suite`, () => {
  const sut = new NotFoundError('Test Error');

  describe('constructor', () => {
    it('should create a new instance of NotFoundError', () => {
      expect(sut).toBeInstanceOf(NotFoundError);
    });
  });

  describe('properties', () => {
    it.each([
      { property: 'message', value: 'Test Error' },
      { property: 'name', value: 'NotFoundError' },
      { property: 'statusCode', value: 404 }
    ])('should return the value $value of the property $property', ({ property, value }) => {
      expect(sut[property]).toBe(value);
    });
  });
});

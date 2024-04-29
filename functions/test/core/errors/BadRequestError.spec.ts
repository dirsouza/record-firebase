import { describe, it, expect } from 'vitest';
import { BadRequestError } from '../../../src/core/errors';

describe(`${BadRequestError.name} Test Suite`, () => {
  const sut = new BadRequestError('Test Error');

  describe('constructor', () => {
    it('should create a new instance of BadRequestError', () => {
      expect(sut).toBeInstanceOf(BadRequestError);
    });
  });

  describe('properties', () => {
    it.each([
      { property: 'message', value: 'Test Error' },
      { property: 'name', value: 'BadRequestError' },
      { property: 'statusCode', value: 400 }
    ])('should return the value $value of the property $property', ({ property, value }) => {
      expect(sut[property]).toBe(value);
    });
  });
});

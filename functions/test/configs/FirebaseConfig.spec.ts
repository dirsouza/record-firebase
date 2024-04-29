import { describe, it, expect } from 'vitest';
import { FirebaseConfig } from '../../src/configs';

describe(`${FirebaseConfig.name} Test Suite`, () => {
  const sut = new FirebaseConfig();

  describe('constructor', () => {
    it('should create a new instance of FirebaseConfig', () => {
      expect(sut).toBeInstanceOf(FirebaseConfig);
    });
  });

  describe('firestore', () => {
    it('should return an instance of Firestore', () => {
      const firestore = sut.firestore;
      expect(firestore).toBeDefined();
    });
  });
});

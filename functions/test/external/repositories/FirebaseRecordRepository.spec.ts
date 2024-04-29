import { describe, it, expect, vi } from 'vitest';
import { FirebaseRecordRepository } from '../../../src/external/repositories';
import { Firestore } from 'firebase-admin/firestore';

describe(`${FirebaseRecordRepository.name} Test Suite`, () => {
  describe('constructor', () => {
    it('should create a new instance of FirebaseRecordRepository', () => {
      const mockFirestore = {
        collection: vi.fn()
      } as unknown as Firestore;
      const sut = new FirebaseRecordRepository(mockFirestore);

      expect(sut).toBeInstanceOf(FirebaseRecordRepository);
    });
  });

  describe('create', () => {
    it('should throw an error when the document is not created', async () => {
      const mockFirestore = {
        collection: vi.fn().mockReturnThis(),
        add: vi.fn().mockResolvedValue({})
      } as unknown as Firestore;
      const sut = new FirebaseRecordRepository(mockFirestore);

      await expect(sut.create('any_name')).rejects.toThrowError('Failed to create record');
    });

    it('should return the id of the created document', async () => {
      const mockFirestore = {
        collection: vi.fn().mockReturnThis(),
        add: vi.fn().mockResolvedValue({ id: 'any_id' })
      } as unknown as Firestore;
      const sut = new FirebaseRecordRepository(mockFirestore);

      await expect(sut.create('any_name')).resolves.toBe('any_id');
    });
  });

  describe('getAll', () => {
    it('should return an empty list when no documents are found', async () => {
      const mockFirestore = {
        collection: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockReturnThis(),
        get: vi.fn().mockResolvedValue({ docs: [], empty: true })
      } as unknown as Firestore;
      const sut = new FirebaseRecordRepository(mockFirestore);

      await expect(sut.getAll()).resolves.toEqual([]);
    });

    it('should return a list of documents', async () => {
      const mockDoc = { id: 'any_id', increment_id: 1, name: 'any_name' };
      const mockFirestore = {
        collection: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockReturnThis(),
        get: vi
          .fn()
          .mockResolvedValue({ docs: [{ id: 'any_id', data: vi.fn().mockReturnValue(mockDoc) }], empty: false })
      } as unknown as Firestore;
      const sut = new FirebaseRecordRepository(mockFirestore);

      await expect(sut.getAll()).resolves.toEqual([mockDoc]);
    });
  });

  describe('getById', () => {
    it('should throw an error when the document is not found by ID', async () => {
      const mockFirestore = {
        collection: vi.fn().mockReturnThis(),
        doc: vi.fn().mockReturnThis(),
        get: vi.fn().mockResolvedValue({ exists: false })
      } as unknown as Firestore;
      const sut = new FirebaseRecordRepository(mockFirestore);

      await expect(sut.getById('any_id')).rejects.toThrowError('Record not found with id: any_id');
    });

    it('should return the document found by ID', async () => {
      const mockDoc = { id: 'any_id', increment_id: 1, name: 'any_name' };
      const mockFirestore = {
        collection: vi.fn().mockReturnThis(),
        doc: vi.fn().mockReturnThis(),
        get: vi.fn().mockResolvedValue({ exists: true, data: vi.fn().mockReturnValue(mockDoc) })
      } as unknown as Firestore;
      const sut = new FirebaseRecordRepository(mockFirestore);

      await expect(sut.getById('any_id')).resolves.toEqual(mockDoc);
    });
  });

  describe('getLastIncrementId', () => {
    it('should return zero when no document is found', async () => {
      const mockParams = { field_by: 'increment_id', order_by: 'asc' } as any;
      const mockFirestore = {
        collection: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        get: vi.fn().mockResolvedValue({ empty: true })
      } as unknown as Firestore;
      const sut = new FirebaseRecordRepository(mockFirestore);

      await expect(sut.getLastIncrementId(mockParams)).resolves.toEqual(0);
    });

    it('should return the last increment_id of the entered document', async () => {
      const mockParams = { field_by: 'increment_id', order_by: 'asc' } as any;
      const mockDoc = { id: 'any_id', increment_id: 1, name: 'any_name' };
      const mockFirestore = {
        collection: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        get: vi.fn().mockResolvedValue({ empty: false, docs: [{ data: vi.fn().mockReturnValue(mockDoc) }] })
      } as unknown as Firestore;
      const sut = new FirebaseRecordRepository(mockFirestore);

      await expect(sut.getLastIncrementId(mockParams)).resolves.toEqual(1);
    });
  });
});

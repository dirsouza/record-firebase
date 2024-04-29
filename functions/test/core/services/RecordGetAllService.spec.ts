import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RecordGetAllService } from '../../../src/core/services';
import { FirebaseRecordRepository } from '../../../src/external/repositories';
import { FirebaseConfig } from '../../../src/configs';
import { RecordMapper } from '../../../src/core/mappers';

vi.mock('../../../src/external/repositories');

describe(`${RecordGetAllService.name} Test Suite`, () => {
  const firebaseConfigMock = new FirebaseConfig();
  const recordRepoMock = new FirebaseRecordRepository(firebaseConfigMock.firestore);
  const sut = new RecordGetAllService(recordRepoMock);

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('constructor', () => {
    it('should create a new instance of RecordGetAllService', () => {
      expect(sut).toBeInstanceOf(RecordGetAllService);
    });
  });

  describe('execute', () => {
    it('should return a string', async () => {
      const mappedRecordsMock: RecordMapper[] = Array.from({ length: 5 }, () => ({
        id: 'any_id',
        increment_id: 1,
        name: 'any_name'
      }));
      const recordsDtoMock = mappedRecordsMock.map(doc => new RecordMapper(doc.id, doc.increment_id, doc.name));
      vi.spyOn(recordRepoMock, 'getAll').mockResolvedValue(mappedRecordsMock);

      await expect(sut.execute()).resolves.toEqual(recordsDtoMock);
    });
  });
});

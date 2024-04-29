import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RecordGetByIdService } from '../../../src/core/services';
import { FirebaseRecordRepository } from '../../../src/external/repositories';
import { FirebaseConfig } from '../../../src/configs';
import { RecordMapper } from '../../../src/core/mappers';

vi.mock('../../../src/external/repositories');

describe(`${RecordGetByIdService.name} Test Suite`, () => {
  const firebaseConfigMock = new FirebaseConfig();
  const recordRepoMock = new FirebaseRecordRepository(firebaseConfigMock.firestore);
  const sut = new RecordGetByIdService(recordRepoMock);

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('constructor', () => {
    it('should create a new instance of RecordGetByIdService', () => {
      expect(sut).toBeInstanceOf(RecordGetByIdService);
    });
  });

  describe('execute', () => {
    it('should return a string', async () => {
      const mappedRecordMock: RecordMapper = {
        id: 'any_id',
        increment_id: 1,
        name: 'any_name'
      };
      const recordDtoMock = new RecordMapper(mappedRecordMock.id, mappedRecordMock.increment_id, mappedRecordMock.name);
      vi.spyOn(recordRepoMock, 'getById').mockResolvedValue(mappedRecordMock);

      await expect(sut.execute('any_id')).resolves.toEqual(recordDtoMock);
    });
  });
});

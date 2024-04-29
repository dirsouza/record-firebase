import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RecordCreateService } from '../../../src/core/services';
import { FirebaseRecordRepository } from '../../../src/external/repositories';
import { FirebaseConfig } from '../../../src/configs';

vi.mock('../../../src/external/repositories');

describe(`${RecordCreateService.name} Test Suite`, () => {
  const firebaseConfigMock = new FirebaseConfig();
  const recordRepoMock = new FirebaseRecordRepository(firebaseConfigMock.firestore);
  const sut = new RecordCreateService(recordRepoMock);

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('constructor', () => {
    it('should create a new instance of RecordCreateService', () => {
      expect(sut).toBeInstanceOf(RecordCreateService);
    });
  });

  describe('execute', () => {
    it('should return a string', async () => {
      vi.spyOn(recordRepoMock, 'create').mockResolvedValue('1');
      const input = { name: 'Record Name' };
      await expect(sut.execute(input)).resolves.toBe('Record created with id: 1');
    });
  });
});

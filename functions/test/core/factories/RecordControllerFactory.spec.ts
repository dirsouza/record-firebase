import { describe, it, expect, vi } from 'vitest';
import { makeRecordController } from '../../../src/core/factories';
import { FirebaseConfig } from '../../../src/configs';
import { RecordController } from '../../../src/external/controllers';

vi.mock('../../../src/external/repositories');

describe('RecordControllerFactory Test Suite', () => {
  const firebaseConfigMock = new FirebaseConfig();

  describe(`${makeRecordController.name}`, () => {
    it('should return an instance of the RecordController class', () => {
      const recordController = makeRecordController(firebaseConfigMock.firestore);
      expect(recordController).toBeInstanceOf(RecordController);
    });
  });
});

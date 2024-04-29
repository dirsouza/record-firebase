import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RecordController } from '../../../src/external/controllers';
import { FirebaseConfig } from '../../../src/configs';
import { FirebaseRecordRepository } from '../../../src/external/repositories';
import { RecordCreateService, RecordGetByIdService, RecordGetAllService } from '../../../src/core/services';

vi.mock('../../../src/configs/FirebaseConfig');
vi.mock('../../../src/external/repositories');
vi.mock('../../../src/core/services');

describe(`${RecordController.name} Test Suite`, () => {
  const firebaseConfigMock = new FirebaseConfig();
  const recordRepoMock = new FirebaseRecordRepository(firebaseConfigMock.firestore);
  const recordCreateSrvMock = new RecordCreateService(recordRepoMock);
  const recordGetAllSrvMock = new RecordGetAllService(recordRepoMock);
  const recordGetByIdSrvMock = new RecordGetByIdService(recordRepoMock);
  const sut = new RecordController(recordCreateSrvMock, recordGetAllSrvMock, recordGetByIdSrvMock);

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('constructor', () => {
    it('should create a new instance of RecordController', () => {
      expect(sut).toBeInstanceOf(RecordController);
    });
  });

  describe('create', () => {
    it('should call the create method of the RecordCreateService', async () => {
      vi.spyOn(recordCreateSrvMock, 'execute').mockResolvedValueOnce('Any result');
      const reqMock = { body: { name: 'any_name' } } as any;
      const respMock = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn()
      } as any;

      await sut.createRecord(reqMock, respMock);

      expect(respMock.status).toHaveBeenCalledWith(201);
      expect(respMock.json).toHaveBeenCalledWith({ status_code: 201, payload: 'Any result' });
    });
  });

  describe('getAll', () => {
    it('should call the getAll method of the RecordGetAllService', async () => {
      vi.spyOn(recordGetAllSrvMock, 'execute').mockResolvedValueOnce([]);
      const reqMock = {} as any;
      const respMock = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn()
      } as any;

      await sut.getAllRecords(reqMock, respMock);

      expect(respMock.status).toHaveBeenCalledWith(200);
      expect(respMock.json).toHaveBeenCalledWith({ status_code: 200, payload: [] });
    });
  });

  describe('getById', () => {
    it('should call the getById method of the RecordGetByIdService', async () => {
      vi.spyOn(recordGetByIdSrvMock, 'execute').mockResolvedValueOnce({} as any);
      const reqMock = { params: { id: 'any_id' } } as any;
      const respMock = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn()
      } as any;

      await sut.getRecord(reqMock, respMock);

      expect(respMock.status).toHaveBeenCalledWith(200);
      expect(respMock.json).toHaveBeenCalledWith({ status_code: 200, payload: {} as any });
    });
  });
});

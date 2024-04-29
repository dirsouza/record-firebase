import { FirebaseRecordRepository } from '../../external/repositories';
import { Firestore } from 'firebase-admin/firestore';
import {
  RecordCreateService,
  RecordGetAllService,
  RecordGetByIdService
} from '../services';
import { RecordController } from '../../external/controllers';

export const makeRecordController = (firestore: Firestore) => {
  const recordRepo = new FirebaseRecordRepository(firestore);
  const createRecordSrv = new RecordCreateService(recordRepo);
  const getByIdRecordSrv = new RecordGetByIdService(recordRepo);
  const getAllRecordSrv = new RecordGetAllService(recordRepo);

  return new RecordController(
    createRecordSrv,
    getAllRecordSrv,
    getByIdRecordSrv
  );
};

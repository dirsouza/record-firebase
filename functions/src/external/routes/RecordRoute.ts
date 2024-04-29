import { Router } from 'express';
import { Firestore } from 'firebase-admin/firestore';
import { makeRecordController } from '../../core/factories';
import { validationMiddleware } from '../middlewares';
import { recordSchema } from '../schemas';

export const recordRoute = (firestore: Firestore) => {
  const route = Router();
  const recordCtr = makeRecordController(firestore);

  route.post(
    '/records',
    validationMiddleware({ schema: recordSchema.body, type: 'body' }),
    recordCtr.createRecord.bind(recordCtr)
  );
  route.get('/records', recordCtr.getAllRecords.bind(recordCtr));
  route.get(
    '/records/:id',
    validationMiddleware({ schema: recordSchema.params, type: 'params' }),
    recordCtr.getRecord.bind(recordCtr)
  );

  return route;
};

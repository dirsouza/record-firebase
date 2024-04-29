import * as functions from 'firebase-functions';
import { app, firestore } from './app';
import { FirebaseRecordRepository } from './external/repositories';

exports.api = functions.https.onRequest(app);

exports.onCreateTrigger = functions.firestore
  .document('records/{documentId}')
  .onCreate(async snap => {
    const firebaseRecordRepo = new FirebaseRecordRepository(firestore);
    const lastIncrementId = await firebaseRecordRepo.getLastIncrementId({
      field_by: 'increment_id',
      order_by: 'desc'
    });

    let increment = 1;
    if (lastIncrementId) {
      increment += lastIncrementId;
    }

    return snap.ref.update({ increment_id: increment });
  });

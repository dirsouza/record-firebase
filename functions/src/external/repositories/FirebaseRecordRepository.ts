import {
  Firestore,
  CollectionReference,
  DocumentData
} from 'firebase-admin/firestore';
import { RecordRepository } from '../../core/repositories';
import { RecordModel } from '../../core/models';
import { BadRequestError, NotFoundError } from '../../core/errors';
import { RecordMapper } from '../../core/mappers';
import { RecordLastInput } from '../../core/interfaces';

export class FirebaseRecordRepository implements RecordRepository {
  private readonly recordCol: CollectionReference<DocumentData>;

  constructor(private readonly firebase: Firestore) {
    this.recordCol = this.firebase.collection('records');
  }

  async create(name: string): Promise<string> {
    const recordDoc = await this.recordCol.add({ name });
    if (!recordDoc?.id) {
      throw new BadRequestError('Failed to create record');
    }

    return recordDoc.id;
  }

  async getAll(): Promise<RecordModel[]> {
    const recordDocs = await this.recordCol.orderBy('increment_id').get();
    if (recordDocs.empty) {
      return [];
    }

    return recordDocs.docs.map(doc => {
      const data = doc.data();
      return new RecordMapper(doc.id, data.increment_id, data.name);
    });
  }

  async getById(id: string): Promise<RecordModel> {
    const recordDoc = await this.recordCol.doc(id).get();
    if (!recordDoc.exists) {
      throw new NotFoundError(`Record not found with id: ${id}`);
    }

    const data = recordDoc.data() as RecordModel;
    return new RecordMapper(id, data.increment_id, data.name);
  }

  async getLastIncrementId(input: RecordLastInput): Promise<number> {
    const recordDoc = await this.recordCol
      .orderBy(input.field_by, input.order_by)
      .limit(1)
      .get();

    if (recordDoc.empty) {
      return 0;
    }

    return recordDoc.docs[0].data().increment_id;
  }
}

import { RecordModel } from '../models';
import { RecordLastInput } from '../interfaces';

export interface RecordRepository {
  create(name: string): Promise<string>;
  getAll(): Promise<RecordModel[]>;
  getById(id: string): Promise<RecordModel>;
  getLastIncrementId(input: RecordLastInput): Promise<number>;
}

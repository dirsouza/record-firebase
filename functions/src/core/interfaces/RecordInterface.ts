import { RecordModel } from '../models';

export interface RecordCreateInput {
  name: string;
}

export interface RecordLastInput {
  field_by: keyof RecordModel;
  order_by: 'asc' | 'desc';
}

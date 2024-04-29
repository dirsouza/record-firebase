import { RecordModel } from '../models';

export class RecordDto {
  id: string;
  name: string;
  increment_id: number;

  constructor(record: RecordModel) {
    this.id = record.id;
    this.name = record.name;
    this.increment_id = record.increment_id;
  }
}

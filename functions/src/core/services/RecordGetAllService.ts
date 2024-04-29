import { UseCase } from '../use-case';
import { RecordDto } from '../dtos';
import { RecordRepository } from '../repositories';

export class RecordGetAllService implements UseCase<void, RecordDto[]> {
  constructor(private readonly recordRepo: RecordRepository) {}

  async execute(): Promise<RecordDto[]> {
    const records = await this.recordRepo.getAll();
    return records.map(record => new RecordDto(record));
  }
}

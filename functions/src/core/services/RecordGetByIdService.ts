import { UseCase } from '../use-case';
import { RecordDto } from '../dtos';
import { RecordRepository } from '../repositories';

export class RecordGetByIdService implements UseCase<string, RecordDto> {
  constructor(private readonly recordRepo: RecordRepository) {}

  async execute(id: string): Promise<RecordDto> {
    const record = await this.recordRepo.getById(id);
    return new RecordDto(record);
  }
}

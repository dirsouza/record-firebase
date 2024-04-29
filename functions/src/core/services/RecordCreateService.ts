import { UseCase } from '../use-case';
import { RecordCreateInput } from '../interfaces';
import { RecordRepository } from '../repositories';

export class RecordCreateService implements UseCase<RecordCreateInput, string> {
  constructor(private readonly recordRepo: RecordRepository) {}

  async execute(input: RecordCreateInput): Promise<string> {
    const recordId = await this.recordRepo.create(input.name);
    return `Record created with id: ${recordId}`;
  }
}

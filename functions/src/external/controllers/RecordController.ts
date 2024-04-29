import { Request, Response } from 'express';
import { UseCase } from '../../core/use-case';
import { RecordCreateInput } from '../../core/interfaces';
import { created, ok } from '../../core/helpers';
import { RecordDto } from '../../core/dtos';

export class RecordController {
  constructor(
    private readonly createRecordSrv: UseCase<RecordCreateInput, string>,
    private readonly getAllRecordsSrv: UseCase<void, RecordDto[]>,
    private readonly getRecordSrv: UseCase<string, RecordDto>
  ) {}

  async createRecord(req: Request, res: Response) {
    const data = req.body as RecordCreateInput;
    const record = await this.createRecordSrv.execute(data);
    res.status(201).json(created(record));
  }

  async getAllRecords(req: Request, res: Response) {
    const records = await this.getAllRecordsSrv.execute();
    res.status(200).json(ok(records));
  }

  async getRecord(req: Request, res: Response) {
    const id = req.params.id;
    const record = await this.getRecordSrv.execute(id);
    res.status(200).json(ok(record));
  }
}

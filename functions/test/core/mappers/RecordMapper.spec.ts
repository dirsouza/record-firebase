import { describe, it, expect } from 'vitest';
import { RecordMapper } from '../../../src/core/mappers';

describe(`${RecordMapper.name} Test Suite`, () => {
  it('should return the mapped data', () => {
    const mappedRecord = new RecordMapper('any_id', 1, 'any_name');
    expect(mappedRecord).toBeInstanceOf(RecordMapper);
    expect(mappedRecord.id).toBe('any_id');
    expect(mappedRecord.increment_id).toBe(1);
    expect(mappedRecord.name).toBe('any_name');
  });
});

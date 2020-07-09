import { Type } from 'class-transformer';

export default class CashEntry {
  id!: string;
  typeName!: string;
  @Type(() => Date)
  createdDate!: Date;
  total!: number;
  description?: string;
}

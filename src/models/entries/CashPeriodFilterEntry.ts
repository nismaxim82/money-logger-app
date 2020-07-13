import DateFnsUtils from '@date-io/date-fns';
import { PeriodTypeEnum } from '../Enum';

export default class CashPeriodFilterEntry {
  type: PeriodTypeEnum;
  from!: Date;
  to?: Date;

  constructor() {
    this.type = PeriodTypeEnum.Monthly;
    this.initializeByType();
  }

  private initializeByType = () => {
    if (this.type !== PeriodTypeEnum.Custom) {
      this.to = undefined;
    }
    const now = new Date();
    const dateFns = new DateFnsUtils();
    if (this.type === PeriodTypeEnum.Daily) {
      this.from = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
      );
    } else if (this.type === PeriodTypeEnum.Weekly) {
      this.from = new Date(
        now.getFullYear(),
        now.getMonth(),
        dateFns.addDays(now, -7).getDate(),
        0,
        0,
        0,
        0
      );
    } else if (this.type === PeriodTypeEnum.Monthly) {
      this.from = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    } else if (this.type === PeriodTypeEnum.Year) {
      this.from = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
    }
  };

  reinitializeByType = () => {
    if (!this.from) {
      this.initializeByType();
    }
  };
}

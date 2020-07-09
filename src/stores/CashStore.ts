import { observable, action } from 'mobx';
// import DateFnsUtils from '@date-io/date-fns';
import { v4 as uuidv4 } from 'uuid';
import CashEntry from '../models/entries/CashEntry';
import CacheService from '../services/CacheService';
import Helpers from '../utility/Helpers';

class CashStore {
  @observable cashes: CashEntry[] = [];
  @observable cashToSave?: CashEntry;
  @observable cashesLoaded = false;

  private cacheService: CacheService;
  // private dateFns: DateFnsUtils;

  constructor(cacheService: CacheService) {
    this.cacheService = cacheService;
    this.loadAllCashes();
  }

  @action getCashToSaveById = (id: string) => {
    this.cashToSave = {
      ...(this.cashes.find((t) => t.id === id) || ({} as CashEntry)),
    };
  };

  @action updateTypeToSaveByProp = (prop: string, newValue: any) => {
    Helpers.setObjectValueByProp(this.cashToSave, prop, newValue);
  };

  validateCashToSave = () => {
    let valid = true;
    if (!this.cashToSave?.typeName) {
      valid = false;
    } else if (!this.cashToSave.createdDate) {
      valid = false;
    } else if (!this.cashToSave.total) {
      valid = false;
    }
    return valid;
  };

  private getSortedCashes = () => {
    return this.cashes.sort((a, b) => {
      if (a.createdDate > b.createdDate) {
        return -1;
      }
      if (a.createdDate < b.createdDate) {
        return 1;
      }
      return 0;
    });
  };

  @action saveCash = async (cashId: string) => {
    const editCash = this.cashes.find((c) => c.id === cashId);
    if (editCash) {
      Object.keys(editCash).forEach((k) => {
        const v = Helpers.getObjectValueByProp(this.cashToSave, k);
        Helpers.setObjectValueByProp(editCash, k, v);
      });
    } else {
      this.cashToSave!.id = uuidv4();
      this.cashes.push(this.cashToSave!);
    }
    this.cashes = this.getSortedCashes();
    await this.cacheService.add('allCashes', this.cashes);
    await this.loadAllCashes();
  };

  @action deleteCash = async (cashId: string) => {
    const cash = this.cashes.find((c) => c.id === cashId);
    if (cash) {
      const typeIndex = this.cashes.indexOf(cash);
      if (typeIndex > -1) {
        this.cashes.splice(typeIndex, 1);
        await this.cacheService.add('allCashes', this.cashes);
      }
    }
  };

  @action getCashesByPeriod = (dateFrom: Date, dateTo?: Date) => {
    if (!dateTo) {
      // eslint-disable-next-line no-param-reassign
      dateTo = new Date();
    }
    console.log(dateFrom, dateTo);
  };

  private loadAllCashes = async () => {
    this.cashes = [];
    const cashes = await this.cacheService.get<CashEntry>(
      'allCashes',
      CashEntry,
      true
    );
    if (cashes) {
      // cashes.forEach((c: CashEntry) => {
      //   // eslint-disable-next-line no-param-reassign
      //   c.createdDate = new Date(c.createdDate);
      //   this.cashes.push(c);
      // });
      this.cashes = cashes;
      console.log(this.cashes);
      this.cashes = this.getSortedCashes();
    }
    this.cashesLoaded = true;
  };

  getCashesDistinctDates = (cashes: CashEntry[]) => {
    const datesOfCashes = cashes.map((c) =>
      c.createdDate
        .toISOString()
        .substring(0, c.createdDate.toISOString().indexOf('T'))
    );
    const result: string[] = [];
    datesOfCashes.forEach((d) => {
      if (!result.length || result[result.length - 1] !== d) {
        result.push(d);
      }
    });
    return result;
  };

  getCashesStartedByDate = (cashes: CashEntry[], dateYYYYMMDD: string) => {
    return cashes.filter((c) =>
      c.createdDate.toISOString().startsWith(dateYYYYMMDD)
    );
  };
}

export default CashStore;

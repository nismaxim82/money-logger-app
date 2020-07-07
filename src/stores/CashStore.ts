import { observable, action } from 'mobx';
import CashEntry from '../models/entries/CashEntry';
import CacheService from '../services/CacheService';
import Helpers from '../utility/Helpers';

class CashStore {
  @observable cashes!: CashEntry[];
  @observable cashToSave?: CashEntry;
  @observable cashesLoaded = false;

  private cacheService: CacheService;

  constructor(cacheService: CacheService) {
    this.cacheService = cacheService;
    this.cashes = [];
    this.cashesLoaded = true;
  }

  @action getCashToSaveById = (id: string) => {
    this.cashToSave = {
      ...(this.cashes.find((t) => t.id === id) || new CashEntry()),
    };
  };

  @action updateTypeToSaveByProp = (prop: string, newValue: any) => {
    Helpers.setObjectValueByProp(this.cashToSave, prop, newValue);
  };
}

export default CashStore;

import { observable, action } from 'mobx';
import TranslateEntry from '../models/entries/TranslateEntry';
import CacheService from '../services/CacheService';
import Helpers from '../utility/Helpers';

class TranslatesStore {
  @observable translate: TranslateEntry;
  @observable translateLoaded = false;

  private cacheService: CacheService;

  constructor(cacheService: CacheService) {
    this.cacheService = cacheService;
    this.translate = new TranslateEntry();

    this.cacheService.get<String>('language', String).then((l) => {
      this.loadTranslate(l || 'en-US');
    });
  }

  @action loadTranslate = async (language: string) => {
    this.translate = Helpers.getTranslateByLanguage(language);
    this.translateLoaded = true;
  };
}

export default TranslatesStore;

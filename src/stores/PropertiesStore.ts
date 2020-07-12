import { observable, action } from 'mobx';
import CacheService from '../services/CacheService';
import LanguageEntry from '../models/entries/LanguageEntry';
import CurrencyEntry from '../models/entries/CurrencyEntry';
import ErrorEntry from '../models/entries/ErrorEntry';

export default class PropertiesStore {
  @observable firstTimeOptionsSelected = true;
  @observable languages!: LanguageEntry[];
  @observable currencies!: CurrencyEntry[];

  private cacheService: CacheService;

  constructor(cacheService: CacheService) {
    this.cacheService = cacheService;
    this.fillLanguages();
    this.loadCurrencies();

    this.cacheService
      .get<Boolean>('firstTimeOptionsSelected', Boolean)
      .then((r: boolean) => {
        this.firstTimeOptionsSelected = !!r;
      });
  }

  private fillLanguages = () => {
    this.languages = [];
    this.languages.push({ name: 'en-US', title: 'English' });
    this.languages.push({ name: 'ru-RU', title: 'Русский' });
    this.languages.push({ name: 'he-IL', title: 'עברית' });
  };

  private loadCurrencies = () => {
    this.currencies = [];

    this.cacheService
      .get<CurrencyEntry>('allCurrencies', CurrencyEntry, true)
      .then((c: CurrencyEntry[]) => {
        if (c && c.length) {
          this.currencies = c;
        } else {
          this.currencies.push({ name: 'USD', symbol: '$' });
          this.currencies.push({ name: 'EUR', symbol: '€' });
        }
      });
  };

  @action addNewCurrency = async (currency: CurrencyEntry) => {
    const result = new ErrorEntry();
    if (!currency.name) {
      result.addError('Currency name is required');
    }
    if (!currency.symbol) {
      result.addError('Currency symbol is required');
    }
    if (this.currencies.some((c) => c.name === currency.name)) {
      result.addError('Currency with this name is already exists');
    }
    if (result.success) {
      this.currencies.push(currency);
      await this.cacheService.add('allCurrencies', this.currencies);
    }
    return result;
  };

  @action saveFirstTimeOptions = async (
    languageName: string,
    currencyName: string
  ) => {
    const result = new ErrorEntry();
    if (!languageName) {
      result.addError('Language selection is required');
    }
    if (!currencyName) {
      result.addError('Currency selection is required');
    }
    if (result.success) {
      await this.cacheService.add('language', languageName);
      await this.cacheService.add('currency', currencyName);
      await this.cacheService.add('firstTimeOptionsSelected', true);
      this.firstTimeOptionsSelected = true;
    }
    return result;
  };
}

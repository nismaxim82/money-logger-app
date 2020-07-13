import { observable, action } from 'mobx';
import enLocale from 'date-fns/locale/en-US';
import heLocale from 'date-fns/locale/he';
import ruLocale from 'date-fns/locale/ru';
import DateFnsUtils from '@date-io/date-fns';
import { LanguagesEnum } from '../models/Enum';
import CacheService from '../services/CacheService';
import LanguageEntry from '../models/entries/LanguageEntry';
import CurrencyEntry from '../models/entries/CurrencyEntry';
import ErrorEntry from '../models/entries/ErrorEntry';
import TranslateEntry from '../models/entries/TranslateEntry';

export default class PropertiesStore {
  @observable firstTimeOptionsSelected = true;
  @observable languages!: LanguageEntry[];
  @observable currentLanguage!: LanguageEntry;
  @observable currencies!: CurrencyEntry[];
  @observable defaultCurrency!: CurrencyEntry;
  @observable dateFns = new DateFnsUtils({ locale: enLocale });

  private cacheService: CacheService;

  constructor(cacheService: CacheService) {
    this.cacheService = cacheService;
    const fillLanguages = async () => {
      await this.fillLanguages();
    };
    fillLanguages();

    const loadCurrencies = async () => {
      await this.loadCurrencies();
    };
    loadCurrencies();

    this.cacheService
      .get<Boolean>('firstTimeOptionsSelected', Boolean)
      .then((r: boolean) => {
        this.firstTimeOptionsSelected = !!r;
      });
  }

  private fillLanguages = async () => {
    this.languages = [];
    this.languages.push({ name: LanguagesEnum.English, title: 'English' });
    this.languages.push({
      name: LanguagesEnum.Hebrew,
      title: 'עברית',
      rtl: true,
    });
    this.languages.push({ name: LanguagesEnum.Russian, title: 'Русский' });

    this.loadCurrentLanguage('');
  };

  @action changeLanguage = async (languageName: string) => {
    await this.cacheService.add('language', languageName);
    await this.loadCurrentLanguage(languageName);
  };

  @action changeCurrency = async (currencyName: string) => {
    await this.cacheService.add('currency', currencyName);
    await this.loadCurrencies();
  };

  @action loadCurrentLanguage = async (languageName: string) => {
    let language = languageName;
    if (!language) {
      language = await this.cacheService.get<String>('language', String);
    }
    let currentLanguage = this.languages.find((l) => l.name === language);
    if (!currentLanguage) {
      currentLanguage = new LanguageEntry();
      currentLanguage.name = LanguagesEnum.English;
      currentLanguage.title = 'English';
    }
    this.currentLanguage = currentLanguage;

    if (this.currentLanguage.name === LanguagesEnum.English) {
      this.dateFns = new DateFnsUtils({ locale: enLocale });
    } else if (this.currentLanguage.name === LanguagesEnum.Hebrew) {
      this.dateFns = new DateFnsUtils({ locale: heLocale });
    } else if (this.currentLanguage.name === LanguagesEnum.Russian) {
      this.dateFns = new DateFnsUtils({ locale: ruLocale });
    }
  };

  private loadCurrencies = async () => {
    this.currencies = [];

    const currencies = await this.cacheService.get<CurrencyEntry>(
      'allCurrencies',
      CurrencyEntry,
      true
    );
    if (currencies && currencies.length) {
      this.currencies = currencies;
    } else {
      this.currencies.push({ name: 'USD', symbol: '$' });
      this.currencies.push({ name: 'EUR', symbol: '€' });
      this.currencies.push({ name: 'ILS', symbol: '₪' });
    }
    const currency = await this.cacheService.get<String>('currency', String);
    this.defaultCurrency =
      this.currencies.find((c) => c.name === currency) || new CurrencyEntry();
  };

  @action addNewCurrency = async (
    translate: TranslateEntry,
    currency: CurrencyEntry
  ) => {
    const result = new ErrorEntry();
    if (!currency.name) {
      result.addError(translate.CurrencyNameIsRequired);
    }
    if (!currency.symbol) {
      result.addError(translate.CurrencySymbolIsRequired);
    }
    if (this.currencies.some((c) => c.name === currency.name)) {
      result.addError(translate.CurrencyWithThisNameIsAlreadyExists);
    }
    if (result.success) {
      this.currencies.push(currency);
      await this.cacheService.add('allCurrencies', this.currencies);
    }
    return result;
  };

  @action saveFirstTimeOptions = async (
    translate: TranslateEntry,
    languageName: string,
    currencyName: string
  ) => {
    const result = new ErrorEntry();
    if (!languageName) {
      result.addError(translate.LanguageSelectionIsRequired);
    }
    if (!currencyName) {
      result.addError(translate.CurrencySelectionIsRequired);
    }
    if (result.success) {
      await this.changeLanguage(languageName);
      await this.changeCurrency(currencyName);
      await this.cacheService.add('firstTimeOptionsSelected', true);
      this.firstTimeOptionsSelected = true;
    }
    return result;
  };

  @action getCurrencyByName = (name: string) => {
    const currency = this.currencies.find((c) => c.name === name);
    return currency || this.defaultCurrency || new CurrencyEntry();
  };
}

import { plainToClass } from 'class-transformer';
import AppStore from '../stores/AppStore';

export default class CacheService {
  private appStore: AppStore;

  constructor(appStore: AppStore) {
    this.appStore = appStore;
    this.get<String>('appVersion', String, false, new Date()).then((r) => {
      if (appStore.version !== r) {
        this.clear();
        this.add('appVersion', appStore.version);
        if (r) {
          window.location.reload();
        }
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public async add(key: string, entry: any) {
    let entryStr: string;
    if (typeof entry !== 'string') {
      entryStr = JSON.stringify({ date: new Date(), entry });
    } else {
      entryStr = entry;
    }
    const result = await localStorage.setItem(key, entryStr);
    return result;
  }

  public async get<T>(
    key: string,
    TCreator: new (...args: any[]) => T,
    isArray?: boolean,
    validAt?: Date
  ): Promise<any> {
    let result: string | null = null;
    if (!this.appStore.enableCache) {
      return result;
    }
    result = await localStorage.getItem(key);
    if (result) {
      console.log(`Key: ${key} loaded from cache`);
    }
    if (!result || !result.length) {
      return result;
    }
    try {
      const parsedResult = JSON.parse(result);
      if (validAt) {
        if (new Date(parsedResult.date) < validAt) {
          return parsedResult.entry;
        }
        console.log(
          `Key: ${key} date expired. ValidAt: ${validAt}. ExpiredAt: ${parsedResult.date}`
        );
        return null;
      }
      if (isArray) {
        const arrayResult: T[] = [];
        parsedResult.entry.forEach((entry: any) => {
          const parsedEntry = plainToClass(TCreator, entry);
          arrayResult.push(parsedEntry);
        });
        return arrayResult;
      }
      return plainToClass(TCreator, parsedResult.entry);
    } catch {
      return result;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public async clear() {
    await localStorage.clear();
  }
}

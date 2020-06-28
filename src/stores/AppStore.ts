import { action, observable } from 'mobx';
import * as AppJson from '../../package.json';
import ServicesStore from './ServicesStore';

class AppStore {
  version = AppJson.version;
  private _services!: ServicesStore;
  get services() {
    // eslint-disable-next-line no-underscore-dangle
    return this._services;
  }
  set services(value: ServicesStore) {
    // eslint-disable-next-line no-underscore-dangle
    this._services = value;
    // eslint-disable-next-line no-underscore-dangle
    this._loadSelectedMenuIndex();
  }

  // NOTE: when application is change version, cache will be cleared
  @observable enableCache = true;
  @observable selectedMenuIndex = 0;

  @action setSelectedMenuIndex = (newValue: number) => {
    this.selectedMenuIndex = newValue;
    this.services.cache.add('selectedMenuIndex', this.selectedMenuIndex);
  };

  private _loadSelectedMenuIndex = async () => {
    if (this.services && this.services.cache) {
      const selectedMenuIndex = await this.services.cache.get(
        'selectedMenuIndex'
      );
      if (selectedMenuIndex) {
        this.selectedMenuIndex = selectedMenuIndex;
      }
    }
  };
}

export default AppStore;

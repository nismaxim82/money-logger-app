import { observable, action } from 'mobx';
import * as AppJson from '../../package.json';
import ServicesStore from './ServicesStore';
import { MenuTypes } from '../models/Enum';

class AppStore {
  version = AppJson.version;
  services!: ServicesStore;

  // NOTE: when application is change version, cache will be cleared
  @observable enableCache = true;
  @observable selectedMenuIndex = 0;
  @observable selectedMenuUrl = '/';

  @action setSelectedMenuIndex = (newValue: number) => {
    this.selectedMenuIndex = newValue;
  };

  @action loadSelectedMenuIndex = (url: string) => {
    const urlParts = url.split('/');
    if (urlParts.length > 1) {
      if (urlParts[1] === MenuTypes.Records) {
        this.selectedMenuIndex = 1;
      } else if (urlParts[1] === MenuTypes.Types) {
        this.selectedMenuIndex = 2;
      } else if (urlParts[1] === MenuTypes.Menu) {
        this.selectedMenuIndex = 3;
      } else {
        this.selectedMenuIndex = 0;
      }
    } else {
      this.selectedMenuIndex = 0;
    }
    if (this.selectedMenuIndex === 0) {
      this.selectedMenuUrl = `/${MenuTypes.Cash}`;
    } else if (this.selectedMenuIndex === 1) {
      this.selectedMenuUrl = `/${MenuTypes.Records}`;
    } else if (this.selectedMenuIndex === 2) {
      this.selectedMenuUrl = `/${MenuTypes.Types}`;
    } else if (this.selectedMenuIndex === 3) {
      this.selectedMenuUrl = `/${MenuTypes.Menu}`;
    }
  };
}

export default AppStore;

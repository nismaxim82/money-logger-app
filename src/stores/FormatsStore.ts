import { observable, action } from 'mobx';

export default class FormatsStore {
  @observable numberWithDigits = new Intl.NumberFormat('en-US', {
    // maximumFractionDigits: 2,
  });

  @action localeChanged = (locale: string) => {
    if (locale) {
      this.numberWithDigits = new Intl.NumberFormat(locale);
    }
  };
}

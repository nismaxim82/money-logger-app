import TranslateEntry from '../models/entries/TranslateEntry';

class Helpers {
  static combineStyles = (...styles: any) => {
    let result: any;
    if (styles.length) {
      result = { ...styles[0] };
      const otherStyles = styles.slice(1);
      if (otherStyles.length) {
        otherStyles.forEach((s: any) => {
          Object.keys(s).forEach((k: string) => {
            if (!result[k]) {
              result[k] = s[k];
            } else {
              result[k] += ` ${s[k]}`;
            }
          });
        });
      }
    }
    return result;
  };

  static getObjectValueByProp = (obj: any, prop: string): any => {
    const splittedProps = prop.split('.');
    if (splittedProps.length > 1) {
      return Helpers.getObjectValueByProp(
        obj[splittedProps[0]],
        splittedProps.splice(1).join('.')
      );
    }
    return obj[splittedProps[0]];
  };

  static setObjectValueByProp = (obj: any, prop: string, value: any) => {
    // eslint-disable-next-line no-param-reassign
    obj[prop] = value;
  };

  static getDateFromString = (date: Date | string) => {
    if (typeof date === 'string') {
      // eslint-disable-next-line no-param-reassign
      date = new Date(date);
    }
    return date;
  };

  static getTranslateByLanguage = (language: string) => {
    let result: TranslateEntry;
    if (language === 'en-US') {
      // eslint-disable-next-line global-require
      result = require('../translates/index.json');
    } else if (language === 'he-IL') {
      // eslint-disable-next-line global-require
      result = require('../translates/index.he.json');
    } else if (language === 'ru-RU') {
      // eslint-disable-next-line global-require
      result = require('../translates/index.ru.json');
    } else {
      result = new TranslateEntry();
    }
    return result;
  };

  static formatString = (value: string, ...args: any[]) => {
    if (args.length) {
      for (let i = 0; i < args.length; i += 1) {
        // eslint-disable-next-line no-param-reassign
        value = value.replace(`{${i}}`, args[i]);
      }
    }
    return value;
  };

  static removeDuplicateStyles = () => {
    setTimeout(() => {
      const allHeadStyles = document.head.getElementsByTagName('style');
      const specificMeta: string[] = ['MuiSelect'];
      const removedMeta: string[] = [];
      for (let i = 0; i < allHeadStyles.length; i += 1) {
        const style = allHeadStyles[i];
        const { jss, meta } = style.dataset;
        if (specificMeta.indexOf(meta || '') !== -1) {
          if (
            jss === '' &&
            meta &&
            meta !== 'makeStyles' &&
            removedMeta.indexOf(meta) === -1
          ) {
            const nextStyle = style.nextSibling as HTMLStyleElement;
            if (
              nextStyle &&
              nextStyle.dataset.jss === jss &&
              nextStyle.dataset.meta === meta
            ) {
              removedMeta.push(meta);
              style.remove();
            }
          }
        }
      }
    }, 100);
  };
}

export default Helpers;

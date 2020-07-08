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
}

export default Helpers;

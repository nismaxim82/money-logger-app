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
}

export default Helpers;

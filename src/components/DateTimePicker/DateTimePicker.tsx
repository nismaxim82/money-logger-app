import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import enPickerLocale from 'date-fns/locale/en-US';
import hePickerLocale from 'date-fns/locale/he';
import ruPickerLocale from 'date-fns/locale/ru';
import { observer } from 'mobx-react';
import React from 'react';
import { LanguagesEnum } from '../../models/Enum';
import PropertiesStore from '../../stores/PropertiesStore';
import useStores from '../../stores/UseStores';

interface IProps {
  controlType: 'date' | 'time';
}

const DateTimePicker = observer((props: IProps & any) => {
  const { propertiesStore }: { propertiesStore: PropertiesStore } = useStores();

  const { controlType, ...otherProps } = props;

  const [pickerLocale, setPickerLocale] = React.useState(enPickerLocale);

  React.useEffect(() => {
    if (propertiesStore.currentLanguage?.name === LanguagesEnum.English) {
      setPickerLocale(enPickerLocale);
    } else if (propertiesStore.currentLanguage?.name === LanguagesEnum.Hebrew) {
      setPickerLocale(hePickerLocale);
    } else if (
      propertiesStore.currentLanguage?.name === LanguagesEnum.Russian
    ) {
      setPickerLocale(ruPickerLocale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertiesStore.currentLanguage?.name]);

  return (
    <MuiPickersUtilsProvider locale={pickerLocale} utils={DateFnsUtils}>
      <>
        {controlType === 'date' && <KeyboardDatePicker {...otherProps} />}
        {controlType === 'time' && <KeyboardTimePicker {...otherProps} />}
      </>
    </MuiPickersUtilsProvider>
  );
});

export default DateTimePicker;

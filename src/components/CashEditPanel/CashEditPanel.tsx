import DateFnsUtils from '@date-io/date-fns';
import {
  AppBar,
  Box,
  createStyles,
  Fade,
  Grid,
  Icon,
  IconButton,
  makeStyles,
  MenuItem,
  Slide,
  TextField,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { observer } from 'mobx-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import enPickerLocale from 'date-fns/locale/en-US';
import hePickerLocale from 'date-fns/locale/he';
import ruPickerLocale from 'date-fns/locale/ru';
import { MenuTypesEnum, LanguagesEnum } from '../../models/Enum';
import CashStore from '../../stores/CashStore';
import TypesStore from '../../stores/TypesStore';
import useStores from '../../stores/UseStores';
import Helpers from '../../utility/Helpers';
import classes from './CashEditPanel.module.css';
import TranslatesStore from '../../stores/TranslatesStore';
import PropertiesStore from '../../stores/PropertiesStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modalContainer: {
      zIndex: theme.zIndex.modal,
      background: theme.palette.background.paper,
    },
    firstBar: {
      background: theme.palette.primary.light,
    },
    secondBar: {
      background: theme.palette.primary.dark,
    },
    toolbarIcon: {
      color: theme.palette.background.default,
    },
    body: {
      padding: theme.spacing(2),
    },
    selectTypeIcon: {
      marginRight: theme.spacing(2),
    },
    totalInput: {
      marginTop: theme.spacing(1),
    },
    currencySelect: {
      marginTop: theme.spacing(1),
    },
  })
);

interface IProps {
  match: any;
}

const CashEditPanel = observer((props: IProps) => {
  const {
    cashStore,
    typesStore,
    translatesStore,
    propertiesStore,
  }: {
    cashStore: CashStore;
    typesStore: TypesStore;
    translatesStore: TranslatesStore;
    propertiesStore: PropertiesStore;
  } = useStores();

  const { translate } = translatesStore;

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);
  const theme = useTheme();

  const [cashId, setCashId] = React.useState('');
  const [typeId, setTypeId] = React.useState('');
  const [cashCurrency, setCashCurrency] = React.useState('');
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
  }, [propertiesStore.currentLanguage?.rtl]);

  const history = useHistory();
  React.useEffect(() => {
    setCashId(props.match.params?.id);
    setTypeId(props.match.params?.typeId);
    if (cashStore.cashesLoaded) {
      cashStore.getCashToSaveById(cashId);
      if (!cashStore.cashToSave?.id) {
        cashStore.updateCashToSaveByProp('typeName', typeId);
      }
    }
  }, [
    cashId,
    cashStore,
    props.match.params,
    typesStore.typesLoaded,
    cashStore.cashesLoaded,
    typesStore,
    typeId,
  ]);

  const createdDate = new Date();

  const deleteCash = async () => {
    await cashStore.deleteCash(cashId);
    history.push(`/${MenuTypesEnum.Records}`);
  };
  const cancelEdit = () => {
    if (cashId) {
      history.push(`/${MenuTypesEnum.Records}`);
    } else {
      history.push(`/${MenuTypesEnum.Cash}`);
    }
  };
  const saveEdit = async () => {
    if (!cashStore.cashToSave?.createdDate) {
      cashStore.updateCashToSaveByProp('createdDate', createdDate);
    }
    if (cashStore.validateCashToSave()) {
      await cashStore.saveCash(cashId);
      history.push(`/${MenuTypesEnum.Records}`);
    }
  };

  const selectTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTypeId = event.currentTarget.dataset.value!;
    cashStore.updateCashToSaveByProp('typeName', selectedTypeId);
  };

  const getIconColor = (color?: string) => {
    return typesStore.getColorInHex(theme, color);
  };

  const pickerDateChange = (date: MaterialUiPickersDate) => {
    cashStore.updateCashToSaveByProp('createdDate', date);
  };

  const totalInputRef = React.useRef<HTMLInputElement>(null);
  const descriptionKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      console.log(totalInputRef.current);
      // eslint-disable-next-line no-unused-expressions
      totalInputRef.current?.focus();
    }
  };

  const changeDescriptionField = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const description = event.currentTarget.value;
    cashStore.updateCashToSaveByProp('description', description);
  };

  const changeTotalField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.currentTarget.value);
    const prop = event.currentTarget.dataset.propName!;
    cashStore.updateCashToSaveByProp(prop, newValue);
  };

  const updateCashCurrency = () => {
    const currency =
      propertiesStore.getCurrencyByName(cashStore.cashToSave?.currency || '')
        .name || '';
    setCashCurrency(currency);
  };

  const changeCurrencyField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    cashStore.updateCashToSaveByProp('currency', newValue);
    updateCashCurrency();
  };

  const totalFieldFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.currentTarget.select();
  };

  const submitOnEnterKeyUp = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.keyCode === 13) {
      await saveEdit();
    }
  };

  React.useEffect(() => {
    updateCashCurrency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashStore.cashToSave, propertiesStore.defaultCurrency]);

  return (
    <Fade in timeout={1000}>
      <Slide direction="up" in mountOnEnter unmountOnExit timeout={300}>
        <div className={css.modalContainer}>
          <AppBar position="static" className={css.firstBar}>
            <Toolbar>
              <Typography variant="h6">
                {cashId ? translate.PaymentEdit : translate.PaymentNew}
              </Typography>
            </Toolbar>
          </AppBar>
          <AppBar position="static" color="primary" className={css.secondBar}>
            <Toolbar>
              <Box className={css.emptyBox} />
              {cashId && (
                <IconButton onClick={deleteCash}>
                  <Icon className={css.toolbarIcon}>delete_forever</Icon>
                </IconButton>
              )}
              <IconButton onClick={cancelEdit}>
                <Icon className={css.toolbarIcon}>close</Icon>
              </IconButton>
              <IconButton onClick={saveEdit}>
                <Icon className={css.toolbarIcon}>done</Icon>
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={css.body}>
            <TextField
              error={!cashStore.cashToSave?.typeName}
              select
              fullWidth
              label={translate.PaymentType}
              className={css.dialogSelect}
              value={cashStore.cashToSave?.typeName || ''}
              onChange={selectTypeChange}
              helperText={
                !cashStore.cashToSave?.typeName
                  ? translate.PaymentTypeIsRequired
                  : ''
              }
            >
              {typesStore.types.map((type) => (
                <MenuItem key={type.name} value={type.name}>
                  <div className={css.dialogSelectBox}>
                    <Icon
                      className={css.selectTypeIcon}
                      style={{ color: getIconColor(type.iconColor) }}
                    >
                      {type.icon}
                    </Icon>
                    <span>{type.label}</span>
                  </div>
                </MenuItem>
              ))}
            </TextField>
            <MuiPickersUtilsProvider locale={pickerLocale} utils={DateFnsUtils}>
              <Grid container justify="space-around" className={css.datesGrid}>
                <KeyboardDatePicker
                  fullWidth
                  margin="normal"
                  label={translate.Date}
                  format="dd/MM/yyyy"
                  value={cashStore.cashToSave?.createdDate || createdDate}
                  onChange={pickerDateChange}
                  okLabel={translate.Select}
                  cancelLabel={translate.Cancel}
                  DialogProps={{
                    className: propertiesStore.currentLanguage?.rtl
                      ? css.pickersRtl
                      : '',
                  }}
                />
                <KeyboardTimePicker
                  fullWidth
                  margin="normal"
                  label={translate.Time}
                  value={cashStore.cashToSave?.createdDate || createdDate}
                  onChange={pickerDateChange}
                  okLabel={translate.Select}
                  cancelLabel={translate.Cancel}
                  DialogProps={{
                    className: propertiesStore.currentLanguage?.rtl
                      ? css.pickersRtl
                      : '',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <TextField
              fullWidth
              className={css.descriptionInput}
              label={translate.Description}
              value={cashStore.cashToSave?.description || ''}
              onChange={changeDescriptionField}
              onKeyUp={descriptionKeyUp}
              inputProps={{ 'data-prop-name': 'description' }}
            />
            <div className={css.totalContainer}>
              <TextField
                inputRef={totalInputRef}
                error={!cashStore.cashToSave?.total}
                fullWidth
                className={css.totalInput}
                label={translate.PaymentTotal}
                value={cashStore.cashToSave?.total || ''}
                onChange={changeTotalField}
                onFocus={totalFieldFocus}
                onKeyUp={submitOnEnterKeyUp}
                type="number"
                inputProps={{ 'data-prop-name': 'total' }}
                helperText={
                  !cashStore.cashToSave?.total
                    ? translate.PaymentTotalIsRequired
                    : ''
                }
              />
              <TextField
                fullWidth
                select
                className={css.currencySelect}
                label={translate.Currency}
                value={cashCurrency}
                onChange={changeCurrencyField}
                inputProps={{ 'data-prop-name': 'currency' }}
              >
                {propertiesStore.currencies.map((c) => (
                  <MenuItem key={c.name} value={c.name}>
                    {c.symbol}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        </div>
      </Slide>
    </Fade>
  );
});

export default CashEditPanel;

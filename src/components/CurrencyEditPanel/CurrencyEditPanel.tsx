import {
  AppBar,
  Box,
  createStyles,
  Fade,
  Icon,
  IconButton,
  makeStyles,
  Slide,
  TextField,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { ChangeEvent } from 'react';
import PropertiesStore from '../../stores/PropertiesStore';
import useStores from '../../stores/UseStores';
import Helpers from '../../utility/Helpers';
import SnackErrors from '../SnackErrors/SnackErrors';
import classes from './CurrencyEditPanel.module.css';
import TranslatesStore from '../../stores/TranslatesStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modalContainer: {
      zIndex: theme.zIndex.modal,
      background: theme.palette.background.paper,
    },
    firstBar: {
      background: theme.palette.primary.light,
    },
    body: {
      padding: theme.spacing(2),
    },
    toolbarIcon: {
      color: theme.palette.background.default,
    },
    currencySymbolField: {
      marginTop: theme.spacing(2),
    },
    errors: {
      color: theme.palette.error.main,
    },
  })
);

interface IProps {
  onCancelEdit?: () => void;
  onSaveEdit?: (newCurrencyName: string) => void;
}

const CurrencyEditPanel = observer((props: IProps) => {
  const {
    propertiesStore,
    translatesStore,
  }: {
    propertiesStore: PropertiesStore;
    translatesStore: TranslatesStore;
  } = useStores();

  const { translate } = translatesStore;

  const [currencyId, setCurrencyId] = React.useState('');
  const [currencyName, setCurrencyName] = React.useState('');
  const [currencySymbol, setCurrencySymbol] = React.useState('');
  const [saveErrors, setSaveErrors] = React.useState<Array<string>>([]);

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  const deleteCurrency = () => {};
  const cancelEdit = () => {
    if (props.onCancelEdit) {
      props.onCancelEdit();
    }
  };
  const saveEdit = async () => {
    const saveResult = await propertiesStore.addNewCurrency(translate, {
      name: currencyName,
      symbol: currencySymbol,
    });
    if (saveResult.success) {
      if (props.onSaveEdit) {
        props.onSaveEdit(currencyName);
      }
    } else {
      setSaveErrors(saveResult.errors);
    }
  };

  const closeErrors = () => {
    setSaveErrors([]);
  };

  const changeCurrencyNameField = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrencyName(event.target.value);
  };

  const changeCurrencySymbol = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrencySymbol(event.target.value);
  };

  return (
    <Fade in timeout={1000}>
      <Slide direction="up" in mountOnEnter unmountOnExit timeout={300}>
        <div className={css.modalContainer}>
          <AppBar position="static" className={css.firstBar}>
            <Toolbar>
              <Typography variant="h6">{translate.NewCurrency}</Typography>
            </Toolbar>
          </AppBar>
          <AppBar position="static" color="primary" className={css.secondBar}>
            <Toolbar>
              <Box className={css.emptyBox} />
              {currencyId && (
                <IconButton onClick={deleteCurrency}>
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
              error={!currencyName}
              fullWidth
              label={translate.Name}
              value={currencyName}
              onChange={changeCurrencyNameField}
              inputProps={{ 'data-prop-name': 'name' }}
              helperText={
                !currencyName ? translate.NameIsRequiredForExampleUSD : ''
              }
            />
            <TextField
              error={!currencySymbol}
              fullWidth
              label={translate.Symbol}
              value={currencySymbol}
              onChange={changeCurrencySymbol}
              inputProps={{ 'data-prop-name': 'symbol' }}
              className={css.currencySymbolField}
              helperText={
                !currencyName ? translate.SymbolIsRequiredForExample$ : ''
              }
            />
            <SnackErrors
              open={saveErrors.length > 0}
              errors={saveErrors}
              onClose={closeErrors}
            />
          </div>
        </div>
      </Slide>
    </Fade>
  );
});

export default CurrencyEditPanel;

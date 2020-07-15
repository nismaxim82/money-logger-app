import {
  AppBar,
  Button,
  createStyles,
  Fade,
  makeStyles,
  MenuItem,
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
import CurrencyEditPanel from '../CurrencyEditPanel/CurrencyEditPanel';
import SnackErrors from '../SnackErrors/SnackErrors';
import classes from './FirstTimeShowPanel.module.css';
import TranslatesStore from '../../stores/TranslatesStore';
import TypesStore from '../../stores/TypesStore';

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
    currenciesContainer: {
      marginTop: theme.spacing(2),
    },
    currenciesSelect: {
      marginRight: theme.spacing(1),
    },
    addCurrencyButton: {
      marginLeft: theme.spacing(1),
    },
    footer: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
    },
  })
);

const FirstTimeShowPanel = observer(() => {
  const {
    propertiesStore,
    translatesStore,
    typesStore,
  }: {
    propertiesStore: PropertiesStore;
    translatesStore: TranslatesStore;
    typesStore: TypesStore;
  } = useStores();

  const { translate } = translatesStore;

  const [language, setLanguage] = React.useState('');
  const [currency, setCurrency] = React.useState('');
  const [saveErrors, setSaveErrors] = React.useState<Array<string>>([]);

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  const [addNewCurrencyOpened, setAddNewCurrencyOpened] = React.useState(false);
  const buttonAddCurrency = () => {
    setAddNewCurrencyOpened(true);
  };

  const buttonSaveProperties = async () => {
    const saveResult = await propertiesStore.saveFirstTimeOptions(
      translate,
      language,
      currency
    );
    if (!saveResult.success) {
      setSaveErrors(saveResult.errors);
    } else {
      await typesStore.loadTypes();
      await translatesStore.loadTranslate(language);
    }
  };

  const addNewCurrencyPanelOnCancelEdit = () => {
    setAddNewCurrencyOpened(false);
  };
  const addNewCurrencyPanelOnSaveEdit = (selectedNewCurrencyName: string) => {
    setAddNewCurrencyOpened(false);
    setCurrency(selectedNewCurrencyName);
  };

  const changeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value);
  };
  const changeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  const closeErrors = () => {
    setSaveErrors([]);
  };

  return (
    <Fade in timeout={1000}>
      <Slide direction="up" in mountOnEnter unmountOnExit timeout={300}>
        <div className={css.modalContainer}>
          <AppBar position="static" className={css.firstBar}>
            <Toolbar>
              <Typography variant="h6">{translate.MainProperties}</Typography>
            </Toolbar>
          </AppBar>
          <div className={css.body}>
            <TextField
              select
              fullWidth
              error={!language}
              value={language}
              onChange={changeLanguage}
              label={translate.Language}
              helperText={!language ? translate.LanguageIsRequired : ''}
            >
              {propertiesStore.languages.map((l) => (
                <MenuItem key={l.name} value={l.name}>
                  {l.title || l.name}
                </MenuItem>
              ))}
            </TextField>
            <div className={css.currenciesContainer}>
              <TextField
                select
                fullWidth
                error={!currency}
                label={translate.Currency}
                value={currency}
                onChange={changeCurrency}
                className={css.currenciesSelect}
                helperText={!currency ? translate.CurrencyIsRequired : ''}
              >
                {propertiesStore.currencies.map((c) => (
                  <MenuItem key={c.name} value={c.name}>
                    {c.symbol || c.name}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                fullWidth
                className={css.addCurrencyButton}
                color="primary"
                variant="outlined"
                size="small"
                onClick={buttonAddCurrency}
              >
                {translate.AddNewCurrency}
              </Button>
            </div>
            <SnackErrors
              open={saveErrors.length > 0}
              errors={saveErrors}
              onClose={closeErrors}
            />
            {addNewCurrencyOpened && (
              <CurrencyEditPanel
                onCancelEdit={addNewCurrencyPanelOnCancelEdit}
                onSaveEdit={addNewCurrencyPanelOnSaveEdit}
              />
            )}
          </div>
          <div className={css.footer}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={buttonSaveProperties}
            >
              {translate.Save}
            </Button>
          </div>
        </div>
      </Slide>
    </Fade>
  );
});

export default FirstTimeShowPanel;

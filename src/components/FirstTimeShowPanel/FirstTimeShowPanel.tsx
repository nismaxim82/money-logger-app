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
  const { propertiesStore }: { propertiesStore: PropertiesStore } = useStores();

  const [language, setLanguage] = React.useState('');
  const [currency, setCurrency] = React.useState('');
  const [openErrors, setOpenErrors] = React.useState(false);
  const [saveErrors, setSaveErrors] = React.useState<Array<string>>([]);

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  const [addNewCurrencyOpened, setAddNewCurrencyOpened] = React.useState(false);
  const buttonAddCurrency = () => {
    setAddNewCurrencyOpened(true);
  };

  const buttonSaveProperties = async () => {
    const saveResult = await propertiesStore.saveFirstTimeOptions(
      language,
      currency
    );
    if (!saveResult.success) {
      setSaveErrors(saveResult.errors);
      setOpenErrors(true);
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
    setOpenErrors(false);
  };

  return (
    <Fade in timeout={1000}>
      <Slide direction="up" in mountOnEnter unmountOnExit timeout={300}>
        <div className={css.modalContainer}>
          <AppBar position="static" className={css.firstBar}>
            <Toolbar>
              <Typography variant="h6">Main properties</Typography>
            </Toolbar>
          </AppBar>
          <div className={css.body}>
            <TextField
              select
              fullWidth
              error={!language}
              value={language}
              onChange={changeLanguage}
              label="Language"
              helperText={!language ? 'Language is required' : ''}
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
                label="Currency"
                value={currency}
                onChange={changeCurrency}
                className={css.currenciesSelect}
                helperText={!currency ? 'Currency is required' : ''}
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
                Add new currency
              </Button>
            </div>
            <SnackErrors
              open={openErrors}
              errors={saveErrors}
              onClose={closeErrors}
            />
          </div>
          <div className={css.footer}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={buttonSaveProperties}
            >
              Save
            </Button>
          </div>
          {addNewCurrencyOpened && (
            <CurrencyEditPanel
              onCancelEdit={addNewCurrencyPanelOnCancelEdit}
              onSaveEdit={addNewCurrencyPanelOnSaveEdit}
            />
          )}
        </div>
      </Slide>
    </Fade>
  );
});

export default FirstTimeShowPanel;

import {
  AppBar,
  Box,
  Button,
  createStyles,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
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
} from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { MenuTypesEnum } from '../../models/Enum';
import PropertiesStore from '../../stores/PropertiesStore';
import TranslatesStore from '../../stores/TranslatesStore';
import useStores from '../../stores/UseStores';
import Helpers from '../../utility/Helpers';
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import classes from './IncomesPanel.module.css';

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
  })
);

const IncomesPanel = observer(() => {
  const {
    translatesStore,
    propertiesStore,
  }: {
    translatesStore: TranslatesStore;
    propertiesStore: PropertiesStore;
  } = useStores();

  const { translate } = translatesStore;

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  const history = useHistory();

  const now = new Date();
  const firstDayOfNowMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
    0,
    0,
    0
  );

  const [incomeType, setIncomeType] = React.useState(0);
  const [filterDateFrom, setFilterDateFrom] = React.useState(
    firstDayOfNowMonth
  );
  const [filterDateTo, setFilterDateTo] = React.useState(now);

  const buttonBackClick = () => {
    history.push(`/${MenuTypesEnum.Menu}`);
  };

  const buttonAddIncomeClick = () => {};

  const onIncomeTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIncomeType = event.target.value || '0';
    setIncomeType(parseInt(newIncomeType, 10));
  };

  const pickerDateFromChange = (date: MaterialUiPickersDate) => {
    const newValue = date || now;
    setFilterDateFrom(newValue);
  };

  const pickerDateToChange = (date: MaterialUiPickersDate) => {
    const newValue = date || now;
    setFilterDateTo(newValue);
  };

  const buttonResetFilterClick = () => {
    setIncomeType(0);
    setFilterDateFrom(firstDayOfNowMonth);
    setFilterDateTo(now);
  };
  const buttonApplyFilterClick = () => {};

  return (
    <Fade in timeout={1000}>
      <Slide direction="up" in mountOnEnter unmountOnExit timeout={300}>
        <div className={css.modalContainer}>
          <AppBar position="static" className={css.firstBar}>
            <Toolbar>
              <Typography variant="h6">{translate.Incomes}</Typography>
            </Toolbar>
          </AppBar>
          <AppBar position="static" color="primary" className={css.secondBar}>
            <Toolbar>
              <IconButton onClick={buttonBackClick}>
                <Icon className={css.toolbarIcon}>arrow_back_ios</Icon>
              </IconButton>
              <Box className={css.emptyBox} />
              <IconButton onClick={buttonAddIncomeClick}>
                <Icon className={css.toolbarIcon}>plus_one</Icon>
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={css.body}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                <Typography className={classes.heading}>
                  {translate.IncomesFilter}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      select
                      fullWidth
                      label={translate.IncomeType}
                      value={incomeType}
                      onChange={onIncomeTypeChange}
                    >
                      <MenuItem value={0}>{translate.All}</MenuItem>
                      <MenuItem value={1}>{translate.Periodic}</MenuItem>
                      <MenuItem value={2}>{translate.Fixed}</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <DateTimePicker
                      controlType="date"
                      fullWidth
                      margin="normal"
                      label={translate.DateFrom}
                      format="dd/MM/yyyy"
                      value={filterDateFrom}
                      onChange={pickerDateFromChange}
                      maxDate={filterDateTo}
                      okLabel={translate.Select}
                      cancelLabel={translate.Cancel}
                      DialogProps={{
                        className: propertiesStore.currentLanguage?.rtl
                          ? css.pickersRtl
                          : '',
                      }}
                    />
                    <DateTimePicker
                      controlType="date"
                      fullWidth
                      margin="normal"
                      label={translate.DateTo}
                      format="dd/MM/yyyy"
                      value={filterDateTo}
                      onChange={pickerDateToChange}
                      minDate={filterDateFrom}
                      maxDate={now}
                      okLabel={translate.Select}
                      cancelLabel={translate.Cancel}
                      DialogProps={{
                        className: propertiesStore.currentLanguage?.rtl
                          ? css.pickersRtl
                          : '',
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      color="primary"
                      variant="outlined"
                      size="small"
                      onClick={buttonResetFilterClick}
                    >
                      {translate.Reset}
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      size="small"
                      onClick={buttonApplyFilterClick}
                    >
                      {translate.ApplyFilter}
                    </Button>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </div>
      </Slide>
    </Fade>
  );
});

export default IncomesPanel;

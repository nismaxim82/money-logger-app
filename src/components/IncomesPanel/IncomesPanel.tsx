import {
  Box,
  Button,
  createStyles,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Fab,
  Grid,
  Icon,
  IconButton,
  makeStyles,
  MenuItem,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { observer } from 'mobx-react';
import React, { MouseEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  MenuSubTypesEnum,
  MenuTypesEnum,
  IncomeTypeEnum,
} from '../../models/Enum';
import PropertiesStore from '../../stores/PropertiesStore';
import TranslatesStore from '../../stores/TranslatesStore';
import useStores from '../../stores/UseStores';
import Helpers from '../../utility/Helpers';
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import PanelBase from '../PanelBase/PanelBase';
import classes from './IncomesPanel.module.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbarIcon: {
      color: theme.palette.background.default,
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
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

  const [filterPanelExpanded, setFilterPanelExpanded] = React.useState(false);
  const [incomeType, setIncomeType] = React.useState(0);
  const [filterDateFrom, setFilterDateFrom] = React.useState(
    firstDayOfNowMonth
  );
  const [filterDateTo, setFilterDateTo] = React.useState(now);
  const [filterApplied, setFilterApplied] = React.useState(false);

  const buttonBackClick = () => {
    history.push(`/${MenuTypesEnum.Menu}`);
  };

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
  const buttonApplyFilterClick = () => {
    setFilterApplied(true);
    setFilterPanelExpanded(false);
  };

  const buttonGlobalResetFilterClick = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    buttonResetFilterClick();
    setFilterApplied(false);
    setFilterPanelExpanded(false);
    event.stopPropagation();
  };

  const onFilterPanelExpanded = (event: object, expanded: boolean) => {
    setFilterPanelExpanded(expanded);
  };

  return (
    <PanelBase
      firstBarChildren={
        <Typography variant="h6">{translate.Incomes}</Typography>
      }
      secondBarChildren={
        <>
          <IconButton onClick={buttonBackClick}>
            <Icon className={css.toolbarIcon}>arrow_back_ios</Icon>
          </IconButton>
          <Box className={css.emptyBox} />
        </>
      }
    >
      <ExpansionPanel
        onChange={onFilterPanelExpanded}
        expanded={filterPanelExpanded}
      >
        <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
          <div className={css.filterHeaderContainer}>
            <Typography className={css.fitlerHeaderTitle}>
              {translate.IncomesFilter}
            </Typography>
            {filterApplied && !filterPanelExpanded && (
              <Button
                color="primary"
                variant="outlined"
                size="small"
                onClick={buttonGlobalResetFilterClick}
              >
                {translate.Reset}
              </Button>
            )}
          </div>
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
                <MenuItem value={IncomeTypeEnum.All}>{translate.All}</MenuItem>
                <MenuItem value={IncomeTypeEnum.Periodic}>
                  {translate.Periodic}
                </MenuItem>
                <MenuItem value={IncomeTypeEnum.Fixed}>
                  {translate.Fixed}
                </MenuItem>
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
      <Link to={`/${MenuTypesEnum.Menu}/${MenuSubTypesEnum.Incomes}/add`}>
        <Fab size="medium" color="primary" aria-label="add" className={css.fab}>
          <Icon>add</Icon>
        </Fab>
      </Link>
    </PanelBase>
  );
});

export default IncomesPanel;

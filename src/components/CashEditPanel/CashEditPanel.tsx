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
import { MenuTypesEnum } from '../../models/Enum';
import CashStore from '../../stores/CashStore';
import TypesStore from '../../stores/TypesStore';
import useStores from '../../stores/UseStores';
import Helpers from '../../utility/Helpers';
import classes from './CashEditPanel.module.css';

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
  })
);

interface IProps {
  match: any;
}

const CashEditPanel = observer((props: IProps) => {
  const {
    cashStore,
    typesStore,
  }: { cashStore: CashStore; typesStore: TypesStore } = useStores();

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);
  const theme = useTheme();

  const [cashId, setCashId] = React.useState('');
  const [typeId, setTypeId] = React.useState('');

  const history = useHistory();
  React.useEffect(() => {
    setCashId(props.match.params?.id);
    setTypeId(props.match.params?.typeId);
    if (cashStore.cashesLoaded) {
      cashStore.getCashToSaveById(cashId);
      if (!cashStore.cashToSave?.id) {
        cashStore.updateTypeToSaveByProp(
          'type',
          typesStore.getTypeByName(typeId)
        );
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

  const deleteCash = () => {
    history.push(`/${MenuTypesEnum.Records}`);
  };
  const cancelEdit = () => {
    if (cashId) {
      history.push(`/${MenuTypesEnum.Records}`);
    } else {
      history.push(`/${MenuTypesEnum.Cash}`);
    }
  };
  const saveEdit = () => {
    history.push(`/${MenuTypesEnum.Cash}`);
  };

  const selectTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTypeId = event.currentTarget.dataset.value!;
    const newType = typesStore.getTypeByName(selectedTypeId);
    cashStore.updateTypeToSaveByProp('type', newType);
  };

  const getIconColor = (color?: string) => {
    return typesStore.getColorInHex(theme, color);
  };

  const createdDate = new Date();
  const pickerDateChange = (date: MaterialUiPickersDate) => {
    cashStore.updateTypeToSaveByProp('createdDate', date);
  };

  return (
    <Fade in timeout={1000}>
      <Slide direction="up" in mountOnEnter unmountOnExit timeout={300}>
        <div className={css.modalContainer}>
          <AppBar position="static" className={css.firstBar}>
            <Toolbar>
              <Typography variant="h6">
                {cashId ? 'Редактирование оплаты' : 'Новая оплата'}
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
              select
              fullWidth
              label="Тип оплаты"
              className={css.dialogSelect}
              value={cashStore.cashToSave?.type?.name || ''}
              onChange={selectTypeChange}
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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around" className={css.datesGrid}>
                <KeyboardDatePicker
                  margin="normal"
                  label="Дата"
                  format="dd/MM/yyyy"
                  value={cashStore.cashToSave?.createdDate || createdDate}
                  onChange={pickerDateChange}
                />
                <KeyboardTimePicker
                  margin="normal"
                  label="Время"
                  value={cashStore.cashToSave?.createdDate || createdDate}
                  onChange={pickerDateChange}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
        </div>
      </Slide>
    </Fade>
  );
});

export default CashEditPanel;

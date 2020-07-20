import { observer } from 'mobx-react';
import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Box,
  IconButton,
  Icon,
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import classes from './IncomeEditPanel.module.css';
import Helpers from '../../utility/Helpers';
import PanelBase from '../PanelBase/PanelBase';
import TranslatesStore from '../../stores/TranslatesStore';
import useStores from '../../stores/UseStores';
import { MenuTypesEnum, MenuSubTypesEnum } from '../../models/Enum';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbarIcon: {
      color: theme.palette.background.default,
    },
  })
);

const IncomeEditPanel = observer(() => {
  const { translatesStore }: { translatesStore: TranslatesStore } = useStores();

  const { translate } = translatesStore;

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  const [incomeId, setIncomeId] = React.useState('');
  const history = useHistory();

  const gotoIncomes = () => {
    history.push(`/${MenuTypesEnum.Menu}/${MenuSubTypesEnum.Incomes}`);
  };

  const deleteIncome = async () => {
    // await cashStore.deleteCash(cashId);
    gotoIncomes();
  };
  const cancelEdit = () => {
    gotoIncomes();
  };
  const saveEdit = async () => {
    // if (!cashStore.cashToSave?.createdDate) {
    //   cashStore.updateCashToSaveByProp('createdDate', createdDate);
    // }
    // if (cashStore.validateCashToSave()) {
    //   await cashStore.saveCash(cashId);
    //   history.push(`/${MenuTypesEnum.Records}`);
    // }
  };

  return (
    <PanelBase
      firstBarChildren={
        <Typography variant="h6">
          {incomeId ? translate.IncomeEdit : translate.IncomeNew}
        </Typography>
      }
      secondBarChildren={
        <>
          <Box className={css.emptyBox} />
          {incomeId && (
            <IconButton onClick={deleteIncome}>
              <Icon className={css.toolbarIcon}>delete_forever</Icon>
            </IconButton>
          )}
          <IconButton onClick={cancelEdit}>
            <Icon className={css.toolbarIcon}>close</Icon>
          </IconButton>
          <IconButton onClick={saveEdit}>
            <Icon className={css.toolbarIcon}>done</Icon>
          </IconButton>
        </>
      }
    >
      <div>test</div>
    </PanelBase>
  );
});

export default IncomeEditPanel;

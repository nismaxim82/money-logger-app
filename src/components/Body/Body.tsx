import { createStyles, Fab, makeStyles, Theme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { observer } from 'mobx-react';
import React from 'react';
import Helpers from '../../utility/Helpers';
import CashPanel from '../CashPanel/CashPanel';
import LastRecordsPanel from '../LastRecordsPanel/LastRecordsPanel';
import classes from './Body.module.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      padding: theme.spacing(2),
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

const Body = observer(() => {
  // const { appStore }: { appStore: AppStore } = useStores();

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  return (
    <div className={css.body}>
      <CashPanel />
      <LastRecordsPanel />
      <Fab size="medium" color="primary" aria-label="add" className={css.fab}>
        <AddIcon />
      </Fab>
    </div>
  );
});

export default Body;

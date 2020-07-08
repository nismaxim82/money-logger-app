import { observer } from 'mobx-react';
import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import heLocale from 'date-fns/locale/he';
import ruLocale from 'date-fns/locale/ru';
import CashStore from '../../stores/CashStore';
import useStores from '../../stores/UseStores';
import Helpers from '../../utility/Helpers';
import * as classes from './RecordsPanel.module.css';
import ICash from '../../models/entries/ICash';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
    },
    stickyHeader: {
      background: theme.palette.background.default,
      lineHeight: 'normal',
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: theme.spacing(1) + 2,
      paddingBottom: theme.spacing(1) + 2,
      borderBottom: `1px solid ${theme.palette.primary.light}`,
    },
    stickyHeaderText: {
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(1),
      borderBottom: `3px solid ${theme.palette.primary.dark}`,
    },
    cashItem: {
      padding: 0,
    },
  })
);

const RecordsPanel = observer(() => {
  const { cashStore }: { cashStore: CashStore } = useStores();

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  const dateFns = new DateFnsUtils({ locale: ruLocale });
  const getFormattedDate = (date: Date) => {
    return dateFns.format(date, 'd MMMM, EEEE');
  };

  return (
    <List className={css.root} subheader={<li />}>
      {cashStore.getCashesDistinctDates(cashStore.cashes).map((d: string) => (
        <li key={`section-${d}`} className={css.listSection}>
          <ul className={css.cashesUl}>
            <ListSubheader className={css.stickyHeader}>
              <span className={css.stickyHeaderText}>
                {getFormattedDate(Helpers.getDateFromString(d))}
              </span>
            </ListSubheader>
            {cashStore
              .getCashesStartedByDate(cashStore.cashes, d)
              .map((cash: ICash) => (
                <ListItem key={cash.id} className={css.cashItem}>
                  <ListItemText primary={`Item ${cash.total}`} />
                </ListItem>
              ))}
          </ul>
        </li>
      ))}
    </List>
  );
});

export default RecordsPanel;

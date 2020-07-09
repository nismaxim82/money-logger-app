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
  Icon,
  Typography,
  useTheme,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import heLocale from 'date-fns/locale/he';
import ruLocale from 'date-fns/locale/ru';
import { useHistory } from 'react-router-dom';
import CashStore from '../../stores/CashStore';
import useStores from '../../stores/UseStores';
import Helpers from '../../utility/Helpers';
import * as classes from './RecordsPanel.module.css';
import CashEntry from '../../models/entries/CashEntry';
import TypesStore from '../../stores/TypesStore';
import { MenuTypesEnum } from '../../models/Enum';

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
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    stickyHeaderText: {
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(1),
      borderBottom: `3px solid ${theme.palette.primary.dark}`,
    },
    cashItem: {
      '&:last-child': {
        marginBottom: theme.spacing(2),
      },
      padding: 0,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      borderBottom: `1px solid ${theme.palette.primary.light}`,
      display: 'grid',
      gridColumnGap: theme.spacing(1),
    },
  })
);

const RecordsPanel = observer(() => {
  const {
    cashStore,
    typesStore,
  }: { cashStore: CashStore; typesStore: TypesStore } = useStores();

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);
  const theme = useTheme();
  const history = useHistory();

  const dateFns = new DateFnsUtils({ locale: ruLocale });
  const getFormattedDate = (date: Date) => {
    return dateFns.format(date, 'd MMMM, EEEE');
  };

  const getIconColor = (color?: string) => {
    return typesStore.getColorInHex(theme, color);
  };

  const buttonCashClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { cashId } = event.currentTarget.dataset;
    history.push(`/${MenuTypesEnum.Cash}/edit/${cashId}`);
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
              .map((cash: CashEntry) => {
                const type = typesStore.getTypeByName(cash.typeName);
                return (
                  <ListItem
                    key={cash.id}
                    className={css.cashItem}
                    button
                    onClick={buttonCashClick}
                    data-cash-id={cash.id}
                  >
                    <Icon style={{ color: getIconColor(type?.iconColor) }}>
                      {type?.icon}
                    </Icon>
                    <Typography variant="body1">{type?.label}</Typography>
                    <Typography variant="body2">
                      {dateFns.format(cash.createdDate, 'HH:mm')}
                    </Typography>
                    <Typography variant="body1" className={css.totalCell}>
                      {cash.total} ₪
                    </Typography>
                    {cash.description && (
                      <Typography className={css.desctiptionCell}>
                        {cash.description}
                      </Typography>
                    )}
                  </ListItem>
                );
              })}
          </ul>
        </li>
      ))}
    </List>
  );
});

export default RecordsPanel;

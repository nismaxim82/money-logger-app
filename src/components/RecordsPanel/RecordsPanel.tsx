import {
  createStyles,
  Icon,
  List,
  ListItem,
  ListSubheader,
  makeStyles,
  Theme,
  Typography,
  useTheme,
} from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import CashEntry from '../../models/entries/CashEntry';
import { MenuTypesEnum } from '../../models/Enum';
import CashStore from '../../stores/CashStore';
import PropertiesStore from '../../stores/PropertiesStore';
import TypesStore from '../../stores/TypesStore';
import useStores from '../../stores/UseStores';
import Helpers from '../../utility/Helpers';
import * as classes from './RecordsPanel.module.css';

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
    propertiesStore,
  }: {
    cashStore: CashStore;
    typesStore: TypesStore;
    propertiesStore: PropertiesStore;
  } = useStores();

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);
  const theme = useTheme();
  const history = useHistory();

  const getFormattedDate = (date: Date) => {
    return propertiesStore.dateFns.format(date, 'd MMMM, EEEE');
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
                      {propertiesStore.dateFns.format(
                        cash.createdDate,
                        'HH:mm'
                      )}
                    </Typography>
                    <Typography variant="body1" className={css.totalCell}>
                      {cash.total}{' '}
                      {propertiesStore.getCurrencyByName(cash.currency).symbol}
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

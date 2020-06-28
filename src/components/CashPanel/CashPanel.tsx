import {
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import TypeEntry from '../../models/entries/TypeEntry';
import AppStore from '../../stores/AppStore';
import TypesStore from '../../stores/TypesStore';
import useStores from '../../stores/UseStores';
import Helpers from '../../utility/Helpers';
import TabPanel from '../TabPanel/TabPanel';
import classes from './CashPanel.module.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabPanel: {
      gridGap: theme.spacing(2),
    },
    cardLabelText: {
      marginTop: theme.spacing(1),
      color: theme.palette.text.primary,
    },
  })
);

const CashPanel = observer(() => {
  const {
    appStore,
    typesStore,
  }: { appStore: AppStore; typesStore: TypesStore } = useStores();

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);
  const theme = useTheme();

  const getThemeColorStyle = (color?: string) => {
    if (!color || !color.length) {
      return '';
    }
    if (color[0] === '#') {
      return color;
    }
    let result = theme as any;
    color.split('.').forEach((p: string) => {
      result = result[p];
    });
    return result;
  };

  return (
    <TabPanel
      id="menu-cash-tab-panel"
      labelledby="menu-cash-tab-panel"
      value={appStore.selectedMenuIndex}
      index={0}
      other={{ className: css.tabPanel }}
    >
      {typesStore.types.map((type: TypeEntry) => (
        <IconButton
          key={type.name}
          className={css.card}
          classes={{ label: css.cardLabel }}
        >
          <type.IconComponent
            style={{ color: getThemeColorStyle(type.iconColor) }}
          />
          <div className={css.cardLabelText}>{type.label}</div>
        </IconButton>
      ))}
    </TabPanel>
  );
});

export default CashPanel;

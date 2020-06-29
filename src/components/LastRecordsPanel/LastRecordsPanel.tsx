import {
  createStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
  useTheme,
  Divider,
} from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import TypeEntry from '../../models/entries/TypeEntry';
import AppStore from '../../stores/AppStore';
import TypesStore from '../../stores/TypesStore';
import useStores from '../../stores/UseStores';
import Helpers from '../../utility/Helpers';
import TabPanel from '../TabPanel/TabPanel';
import classes from './LastRecordsPanel.module.css';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const LastRecordsPanel = observer(() => {
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
      id="menu-last-records-tab-panel"
      labelledby="menu-last-records-tab-panel"
      value={appStore.selectedMenuIndex}
      index={1}
      other={{ className: css.tabPanel }}
    >
      <List className={css.list}>
        {typesStore.types.map((type: TypeEntry) => (
          <>
            <ListItem key={type.name} button component="li">
              <ListItemAvatar>
                <type.IconComponent
                  style={{ color: getThemeColorStyle(type.iconColor) }}
                />
              </ListItemAvatar>
              <ListItemText primary={type.label} />
            </ListItem>
            <Divider component="li" />
          </>
        ))}
      </List>
    </TabPanel>
  );
});

export default LastRecordsPanel;

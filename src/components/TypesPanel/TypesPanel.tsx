import {
  createStyles,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import TypeEntry from '../../models/entries/TypeEntry';
import AppStore from '../../stores/AppStore';
import TypesStore from '../../stores/TypesStore';
import useStores from '../../stores/UseStores';
import Helpers from '../../utility/Helpers';
import TabPanel from '../TabPanel/TabPanel';
import classes from './TypesPanel.module.css';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const TypesPanel = observer(() => {
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
      id="menu-types-tab-panel"
      labelledby="menu-types-tab-panel"
      value={appStore.selectedMenuIndex}
      index={2}
      other={{ className: css.tabPanel }}
    >
      <List component="nav" className={css.list}>
        {typesStore.types.map((type: TypeEntry) => (
          <div key={type.name}>
            <ListItem button>
              <ListItemAvatar>
                <type.IconComponent
                  style={{
                    color: getThemeColorStyle(type.iconColor),
                    fontSize: '2rem',
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={type.label}
                primaryTypographyProps={{ variant: 'subtitle1' }}
              />
            </ListItem>
            <Divider component="div" />
          </div>
        ))}
      </List>
    </TabPanel>
  );
});

export default TypesPanel;

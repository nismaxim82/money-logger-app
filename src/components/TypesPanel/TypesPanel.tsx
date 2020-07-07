import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme,
  Icon,
} from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import TypeEntry from '../../models/entries/TypeEntry';
import TypesStore from '../../stores/TypesStore';
import useStores from '../../stores/UseStores';
import Helpers from '../../utility/Helpers';
import classes from './TypesPanel.module.css';
import { MenuTypesEnum } from '../../models/Enum';

// const useStyles = makeStyles((theme: Theme) => createStyles({}));

const TypesPanel = observer(() => {
  const { typesStore }: { typesStore: TypesStore } = useStores();

  // const styles = useStyles();
  const css = Helpers.combineStyles({}, classes);
  const theme = useTheme();

  const history = useHistory();

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

  const typeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const typeName = event.currentTarget.dataset.id;
    history.push(`/${MenuTypesEnum.Types}/edit/${typeName}`);
  };

  return (
    <List component="nav" className={css.list}>
      {typesStore.types.map((type: TypeEntry) => (
        <div key={type.name}>
          <ListItem button onClick={typeClick} data-id={type.name}>
            <ListItemAvatar>
              <Icon
                style={{
                  color: getThemeColorStyle(type.iconColor),
                  fontSize: '2rem',
                }}
              >
                {type.icon}
              </Icon>
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
  );
});

export default TypesPanel;

import {
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Typography,
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
import classes from './CashPanel.module.css';
import { MenuTypesEnum } from '../../models/Enum';

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
  const { typesStore }: { typesStore: TypesStore } = useStores();

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

  const history = useHistory();

  const buttonAddNewCashClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const { typeId } = event.currentTarget.dataset;
    history.push(`/${MenuTypesEnum.Cash}/add/${typeId}`);
  };

  return (
    <Grid container className={css.grid} spacing={2}>
      {typesStore.typesLoaded &&
        typesStore.types.map((type: TypeEntry) => (
          <Grid
            key={type.name}
            item
            xs
            container
            alignItems="center"
            justify="center"
          >
            <IconButton
              className={css.card}
              classes={{ label: css.cardLabel }}
              onClick={buttonAddNewCashClick}
              data-type-id={type.name}
            >
              <Icon
                style={{
                  color: getThemeColorStyle(type.iconColor),
                  fontSize: '2rem',
                }}
                className={css.cardIcon}
              >
                {type.icon}
              </Icon>
              <Typography variant="subtitle1" className={css.cardLabelText}>
                {type.label}
              </Typography>
            </IconButton>
          </Grid>
        ))}
    </Grid>
  );
});

export default CashPanel;

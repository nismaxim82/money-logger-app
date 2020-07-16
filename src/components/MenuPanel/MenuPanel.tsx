import {
  createStyles,
  Icon,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { MenuSubTypesEnum, MenuTypesEnum } from '../../models/Enum';
import TranslatesStore from '../../stores/TranslatesStore';
import useStores from '../../stores/UseStores';
import Helpers from '../../utility/Helpers';
import classes from './MenuPanel.module.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      justifyContent: 'flex-start',
    },
    cardLabelText: {
      marginTop: theme.spacing(1),
      color: theme.palette.text.primary,
      lineHeight: 1.2,
    },
    cardIcon: {
      fontSize: '2rem',
    },
  })
);

const MenuPanel = observer(() => {
  const { translatesStore }: { translatesStore: TranslatesStore } = useStores();

  const { translate } = translatesStore;

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  const history = useHistory();

  const buttonLinkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const url = event.currentTarget.dataset.linkUrl || '';
    history.push(url);
  };

  const buttons = [
    {
      endUrl: MenuSubTypesEnum.Properties,
      icon: 'settings',
      label: translate.MainProperties,
    },
    {
      endUrl: MenuSubTypesEnum.Reports,
      icon: 'assignment',
      label: translate.Reports,
    },
    {
      endUrl: MenuSubTypesEnum.Incomes,
      icon: 'monetization_on',
      label: translate.Incomes,
    },
    {
      endUrl: MenuSubTypesEnum.Synchronization,
      icon: 'settings_system_daydream',
      label: translate.Sync,
    },
  ];

  return (
    <div className={css.grid}>
      {buttons.map((b) => (
        <IconButton
          key={b.endUrl}
          className={css.card}
          classes={{ label: css.cardLabel }}
          onClick={buttonLinkClick}
          data-link-url={`/${MenuTypesEnum.Menu}/${b.endUrl}`}
        >
          <Icon className={css.cardIcon}>{b.icon}</Icon>
          <Typography variant="subtitle1" className={css.cardLabelText}>
            {b.label}
          </Typography>
        </IconButton>
      ))}
    </div>
  );
});

export default MenuPanel;

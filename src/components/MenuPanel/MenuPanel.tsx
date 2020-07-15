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
import Helpers from '../../utility/Helpers';
import classes from './MenuPanel.module.css';
import { MenuTypesEnum, MenuSubTypesEnum } from '../../models/Enum';
import useStores from '../../stores/UseStores';
import TranslatesStore from '../../stores/TranslatesStore';

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
      endUrl: MenuSubTypesEnum.Income,
      icon: 'monetization_on',
      label: translate.Income,
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
      {/* <IconButton
        className={css.card}
        classes={{ label: css.cardLabel }}
        onClick={buttonLinkClick}
        data-link-url={`/${MenuTypesEnum.Menu}/${MenuSubTypesEnum.Properties}`}
      >
        <Icon className={css.cardIcon}>settings</Icon>
        <Typography variant="subtitle1" className={css.cardLabelText}>
          {translate.MainProperties}
        </Typography>
      </IconButton>
      <IconButton
        className={css.card}
        classes={{ label: css.cardLabel }}
        onClick={buttonLinkClick}
        data-link-url={`/${MenuTypesEnum.Menu}/${MenuSubTypesEnum.Reports}`}
      >
        <Icon className={css.cardIcon}>assignment</Icon>
        <Typography variant="subtitle1" className={css.cardLabelText}>
          {translate.Reports}
        </Typography>
      </IconButton>
      <IconButton
        className={css.card}
        classes={{ label: css.cardLabel }}
        onClick={buttonLinkClick}
        data-link-url={`/${MenuTypesEnum.Menu}/${MenuSubTypesEnum.Income}`}
      >
        <Icon className={css.cardIcon}>monetization_on</Icon>
        <Typography variant="subtitle1" className={css.cardLabelText}>
          {translate.Income}
        </Typography>
      </IconButton>
      <IconButton
        className={css.card}
        classes={{ label: css.cardLabel }}
        onClick={buttonLinkClick}
        data-link-url={`/${MenuTypesEnum.Menu}/${MenuSubTypesEnum.Synchronization}`}
      >
        <Icon className={css.cardIcon}>settings_system_daydream</Icon>
        <Typography variant="subtitle1" className={css.cardLabelText}>
          {translate.Sync}
        </Typography>
      </IconButton> */}
    </div>
  );
});

export default MenuPanel;

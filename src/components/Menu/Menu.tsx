import {
  AppBar,
  Box,
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Tabs,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  ArrowDropDown as ArrowDropDownIcon,
  AttachMoney as AttachMoneyIcon,
  List as ListIcon,
  Menu as MenuIcon,
  MenuBook as MenuBookIcon,
  MoreHoriz as MoreHorizIcon,
  Search as SearchIcon,
} from '@material-ui/icons';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Helpers from '../../utility/Helpers';
import LinkTab from '../LinkTab/LinkTab';
import classes from './Menu.module.css';
import useStores from '../../stores/UseStores';
import AppStore from '../../stores/AppStore';
import TranslatesStore from '../../stores/TranslatesStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    firstBar: {
      background: theme.palette.primary.light,
    },
    secondBar: {
      background: theme.palette.primary.dark,
    },
    menuIcon: {
      color: theme.palette.background.default,
    },
    comboButton: {
      color: theme.palette.background.default,
    },
    searchIcon: {
      color: theme.palette.background.default,
    },
  })
);

const Menu = observer(() => {
  const {
    appStore,
    translatesStore,
  }: { appStore: AppStore; translatesStore: TranslatesStore } = useStores();

  const { translate } = translatesStore;

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  const history = useHistory();
  const menuTabChanged = (event: any, newValue: number) => {
    appStore.setSelectedMenuIndex(newValue);
  };

  useEffect(() => {
    appStore.loadSelectedMenuIndex(history.location.pathname);
    const listener = history.listen(() => {
      appStore.loadSelectedMenuIndex(history.location.pathname);
    });

    return () => {
      listener();
    };
  });

  const menuTabProps = (name: string, href?: string) => {
    return {
      id: `menu-tab-${name}`,
      'aria-controls': `menu-tab-${name}`,
      to: href || `/${name}`,
      currentUrl: appStore.selectedMenuUrl,
    };
  };

  return (
    <>
      <AppBar position="static" className={css.firstBar}>
        <Toolbar>
          {appStore.selectedMenuIndex === 0 && (
            <Typography variant="h6" className={css.headerTitle}>
              {translate.AddPayment}
            </Typography>
          )}
          {appStore.selectedMenuIndex === 1 && (
            <Box className={css.headerBox}>
              <IconButton>
                <MenuIcon className={css.menuIcon} />
              </IconButton>
              <Button
                className={css.comboButton}
                endIcon={<ArrowDropDownIcon />}
              >
                <span className={css.comboButtonTextBox}>
                  <span>{new Date().toDateString()}</span>
                  <span>{Helpers.formatString(translate.RecordsN, 21)}</span>
                </span>
              </Button>
              <IconButton>
                <SearchIcon className={css.searchIcon} />
              </IconButton>
            </Box>
          )}
          {appStore.selectedMenuIndex === 2 && (
            <Typography variant="h6" className={css.headerTitle}>
              {translate.Types}
            </Typography>
          )}
          {appStore.selectedMenuIndex === 3 && (
            <Typography variant="h6" className={css.headerTitle}>
              {translate.More}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <AppBar position="static" color="primary" className={css.secondBar}>
        <Tabs
          value={appStore.selectedMenuIndex}
          onChange={menuTabChanged}
          aria-label="menu tabs"
          variant="fullWidth"
        >
          <LinkTab {...menuTabProps('cash', '/')} icon={<AttachMoneyIcon />} />
          <LinkTab {...menuTabProps('records')} icon={<MenuBookIcon />} />
          <LinkTab {...menuTabProps('types')} icon={<ListIcon />} />
          <LinkTab {...menuTabProps('menu')} icon={<MoreHorizIcon />} />
        </Tabs>
      </AppBar>
    </>
  );
});

export default Menu;

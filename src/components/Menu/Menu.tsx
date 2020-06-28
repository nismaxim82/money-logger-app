import {
  AppBar,
  Box,
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';
import {
  ArrowDropDown as ArrowDropDownIcon,
  AttachMoney as AttachMoneyIcon,
  List as ListIcon,
  Menu as MenuIcon,
  MenuBook as MenuBookIcon,
  MoreHoriz as MoreHorizIcon,
  Search as SearchIcon
} from '@material-ui/icons';
import { observer } from 'mobx-react';
import React from 'react';
import AppStore from '../../stores/AppStore';
import useStores from '../../stores/UseStores';
import Helpers from '../../utility/Helpers';
import classes from './Menu.module.css';

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
  const { appStore }: { appStore: AppStore } = useStores();

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  const menuTabChanged = (event: any, newValue: number) => {
    appStore.setSelectedMenuIndex(newValue);
  };

  const menuTabProps = (name: string) => {
    return {
      id: `menu-tab-${name}`,
      'aria-controls': `menu-tab-${name}`,
    };
  };

  return (
    <>
      <AppBar position="static" className={css.firstBar}>
        <Toolbar>
          {appStore.selectedMenuIndex === 0 && (
            <Typography variant="h6" className={css.headerTitle}>
              Внести оплату
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
                  <span>Записей 21</span>
                </span>
              </Button>
              <IconButton>
                <SearchIcon className={css.searchIcon} />
              </IconButton>
            </Box>
          )}
          {appStore.selectedMenuIndex === 2 && (
            <Typography variant="h6" className={css.headerTitle}>
              Типы
            </Typography>
          )}
          {appStore.selectedMenuIndex === 3 && (
            <Typography variant="h6" className={css.headerTitle}>
              Еще
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
          <Tab {...menuTabProps('cash')} icon={<AttachMoneyIcon />} />
          <Tab {...menuTabProps('last-records')} icon={<MenuBookIcon />} />
          <Tab {...menuTabProps('types')} icon={<ListIcon />} />
          <Tab {...menuTabProps('menu')} icon={<MoreHorizIcon />} />
        </Tabs>
      </AppBar>
    </>
  );
});

export default Menu;

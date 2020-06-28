import {
  AppBar,
  createStyles,
  CssBaseline,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';
import {
  AttachMoney as AttachMoneyIcon,
  List as ListIcon,
  MenuBook as MenuBookIcon,
  MoreHoriz as MoreHorizIcon
} from '@material-ui/icons';
import { Provider } from 'mobx-react';
import React from 'react';
import classes from './App.module.css';
import CashPanel from './components/CashPanel/CashPanel';
import store from './stores';
import Helpers from './utility/Helpers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      padding: theme.spacing(2),
    },
    menuButton: {
      marginLeft: theme.spacing(2),
    },
    firstBar: {
      background: theme.palette.primary.light,
    },
    secondBar: {
      background: theme.palette.primary.dark,
    },
  })
);

const App = () => {
  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  const [value, setValue] = React.useState(0);
  const menuTabChanged = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const menuTabProps = (name: string) => {
    return {
      id: `menu-tab-${name}`,
      'aria-controls': `menu-tab-${name}`,
    };
  };

  return (
    <Provider store={store}>
      <CssBaseline />
      <div className={css.page}>
        <AppBar position="static" className={css.firstBar}>
          <Toolbar>
            <Typography variant="h6" className={css.headerTitle}>
              Внести оплату
            </Typography>
            <IconButton
              edge="start"
              className={css.menuButton}
              color="inherit"
              aria-label="menu"
            />
          </Toolbar>
        </AppBar>
        <AppBar position="static" color="primary" className={css.secondBar}>
          <Tabs
            value={value}
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
        <div className={css.body}>
          <CashPanel value={value} />
        </div>
      </div>
    </Provider>
  );
};

export default App;

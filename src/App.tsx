import {
  AppBar,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';
import { Provider } from 'mobx-react';
import React from 'react';
import classes from './App.module.css';
import store from './stores';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      padding: theme.spacing(2),
    },
    menuButton: {
      marginLeft: theme.spacing(2),
    },
  })
);

function App() {
  const styles = useStyles();
  return (
    <Provider store={store}>
      <div className={classes.page}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.headerTitle}>
              Внести оплату
            </Typography>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            />
          </Toolbar>
        </AppBar>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h6" className={classes.headerTitle}>
              Внести оплату
            </Typography>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            />
          </Toolbar>
        </AppBar>
        <div className={[classes.body, styles.body].join(' ')}>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
        </div>
      </div>
    </Provider>
  );
}

export default App;

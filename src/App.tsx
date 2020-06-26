import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Provider } from 'mobx-react';
import React from 'react';
import classes from './App.module.css';
import store from './stores';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      padding: theme.spacing(1),
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
        <div className={[classes.body, styles.body].join(' ')}>test</div>
      </div>
    </Provider>
  );
}

export default App;

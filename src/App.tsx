import { CssBaseline } from '@material-ui/core';
import { Provider } from 'mobx-react';
import React from 'react';
import classes from './App.module.css';
import Body from './components/Body/Body';
import Menu from './components/Menu/Menu';
import store from './stores';

const App = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <div className={classes.page}>
        <Menu />
        <Body />
      </div>
    </Provider>
  );
};

export default App;

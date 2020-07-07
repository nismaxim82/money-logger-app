import { CssBaseline } from '@material-ui/core';
import { Provider } from 'mobx-react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import classes from './App.module.css';
import Body from './components/Body/Body';
import Menu from './components/Menu/Menu';
import store from './stores';
import * as AppSettings from '../package.json';

const App = () => {
  return (
    <Provider store={store}>
      <Router basename={`/${AppSettings.name}`}>
        <CssBaseline />
        <div className={classes.page}>
          <Menu />
          <Body />
        </div>
      </Router>
    </Provider>
  );
};

export default App;

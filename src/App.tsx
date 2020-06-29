import { CssBaseline } from '@material-ui/core';
import { Provider } from 'mobx-react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import classes from './App.module.css';
import Body from './components/Body/Body';
import Menu from './components/Menu/Menu';
import store from './stores';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
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

import { CssBaseline } from '@material-ui/core';
import {
  createMuiTheme,
  jssPreset,
  StylesProvider,
  ThemeProvider,
  Theme,
} from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { observer } from 'mobx-react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as AppSettings from '../../../package.json';
import PropertiesStore from '../../stores/PropertiesStore';
import useStores from '../../stores/UseStores';
import Body from '../Body/Body';
import Menu from '../Menu/Menu';
import classes from './ThemeCreator.module.css';
import Helpers from '../../utility/Helpers';

const jssScript = create({ plugins: [...jssPreset().plugins, rtl()] });

const ThemeCreator = observer(() => {
  const { propertiesStore }: { propertiesStore: PropertiesStore } = useStores();

  const [theme, setTheme] = React.useState<Theme | null>(null);
  React.useEffect(() => {
    if (propertiesStore.currentLanguage) {
      const direction = !propertiesStore.currentLanguage?.rtl ? 'ltr' : 'rtl';
      if (theme?.direction !== direction) {
        setTheme(
          createMuiTheme({
            direction,
          })
        );
        Helpers.removeDuplicateStyles();
      }
      document.body.style.direction = direction;
      document.body.classList.add(direction);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertiesStore.currentLanguage?.rtl]);

  return theme ? (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jssScript}>
        <CssBaseline />
        <Router basename={`/${AppSettings.name}`}>
          <div className={classes.page}>
            <Menu />
            <Body />
          </div>
        </Router>
      </StylesProvider>
    </ThemeProvider>
  ) : (
    <></>
  );
});

export default ThemeCreator;

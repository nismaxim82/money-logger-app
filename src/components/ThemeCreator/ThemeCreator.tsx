import { observer } from 'mobx-react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { create } from 'jss';
import rtl from 'jss-rtl';
import {
  StylesProvider,
  jssPreset,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
// import { enUS, heIL, ruRU } from '@material-ui/core/locale';
import Body from '../Body/Body';
import Menu from '../Menu/Menu';
import classes from './ThemeCreator.module.css';
import * as AppSettings from '../../../package.json';
import useStores from '../../stores/UseStores';
import PropertiesStore from '../../stores/PropertiesStore';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const ThemeCreator = observer(() => {
  const { propertiesStore }: { propertiesStore: PropertiesStore } = useStores();

  const [theme, setTheme] = React.useState(
    createMuiTheme({
      direction: 'ltr',
    })
  );
  React.useEffect(() => {
    const direction = !propertiesStore.currentLanguage?.rtl ? 'ltr' : 'rtl';
    if (theme.direction !== direction) {
      setTheme(
        createMuiTheme({
          direction,
        })
      );
      document.body.style.direction = direction;
      propertiesStore.setThemeLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertiesStore.currentLanguage?.rtl]);

  return (
    <StylesProvider jss={jss}>
      <CssBaseline />
      {propertiesStore.themeLoaded && (
        <ThemeProvider theme={theme}>
          <Router basename={`/${AppSettings.name}`}>
            <div className={classes.page}>
              <Menu />
              <Body />
            </div>
          </Router>
        </ThemeProvider>
      )}
    </StylesProvider>
  );
});

export default ThemeCreator;

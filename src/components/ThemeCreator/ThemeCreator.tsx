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
    createMuiTheme(
      {
        direction: 'ltr',
      }
      // enUS
    )
  );
  React.useEffect(() => {
    const direction = !propertiesStore.currentLanguage?.rtl ? 'ltr' : 'rtl';
    if (theme.direction !== direction) {
      // let themeLocale = enUS;
      // if (propertiesStore.currentLanguage.name === LanguagesEnum.Hebrew) {
      //   themeLocale = heIL;
      // } else if (
      //   propertiesStore.currentLanguage.name === LanguagesEnum.Russian
      // ) {
      //   themeLocale = ruRU;
      // }
      setTheme(
        createMuiTheme(
          {
            direction,
          }
          // themeLocale
        )
      );
      document.body.style.direction = direction;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertiesStore.currentLanguage?.rtl]);

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <CssBaseline />
        <Router basename={`/${AppSettings.name}`}>
          <div className={classes.page}>
            <Menu />
            <Body />
          </div>
        </Router>
      </StylesProvider>
    </ThemeProvider>
  );
});

export default ThemeCreator;

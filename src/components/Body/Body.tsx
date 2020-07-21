import { createStyles, Fab, makeStyles, Theme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../routes/Routes';
import RouteWithSubRoutes from '../../routes/RouteWithSubRoutes';
import Helpers from '../../utility/Helpers';
import classes from './Body.module.css';
import useStores from '../../stores/UseStores';
import AppStore from '../../stores/AppStore';
import { MenuTypesEnum } from '../../models/Enum';
import FirstTimeShowPanel from '../FirstTimeShowPanel/FirstTimeShowPanel';
import PropertiesStore from '../../stores/PropertiesStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      padding: theme.spacing(2),
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

const Body = observer(() => {
  const {
    appStore,
    propertiesStore,
  }: { appStore: AppStore; propertiesStore: PropertiesStore } = useStores();

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  const getAddButtonLinkUrl = () => {
    let prefix = appStore.selectedMenuUrl;
    if (prefix === '/') {
      prefix += MenuTypesEnum.Cash;
    }
    return `${appStore.selectedMenuUrl}/add`;
  };

  const showAddIcon = () => {
    return (
      appStore.selectedMenuUrl !== `/${MenuTypesEnum.Menu}` &&
      appStore.selectedMenuUrl !== `/${MenuTypesEnum.Records}`
    );
  };

  return !appStore.loading ? (
    <div className={css.body}>
      {routes.map((route) => (
        // eslint-disable-next-line react/no-array-index-key
        <RouteWithSubRoutes key={route.path} {...route} />
      ))}
      {showAddIcon() && (
        <Link to={getAddButtonLinkUrl()}>
          <Fab
            size="medium"
            color="primary"
            aria-label="add"
            className={css.fab}
          >
            <AddIcon />
          </Fab>
        </Link>
      )}
      {!propertiesStore.firstTimeOptionsSelected && <FirstTimeShowPanel />}
    </div>
  ) : (
    <></>
  );
});

export default Body;

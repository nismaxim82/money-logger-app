import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import TranslatesStore from '../../stores/TranslatesStore';
import useStores from '../../stores/UseStores';
import Helpers from '../../utility/Helpers';
import MainProperties from '../MainProperties/MainProperties';
import PanelBase from '../PanelBase/PanelBase';
import classes from './FirstTimeShowPanel.module.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modalContainer: {
      zIndex: theme.zIndex.modal,
      background: theme.palette.background.paper,
    },
    firstBar: {
      background: theme.palette.primary.light,
    },
    body: {
      padding: theme.spacing(2),
    },
    currenciesContainer: {
      marginTop: theme.spacing(2),
    },
    currenciesSelect: {
      marginRight: theme.spacing(1),
    },
    addCurrencyButton: {
      marginLeft: theme.spacing(1),
    },
    footer: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
    },
  })
);

const FirstTimeShowPanel = observer(() => {
  const {
    translatesStore,
  }: {
    translatesStore: TranslatesStore;
  } = useStores();

  const { translate } = translatesStore;

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  const mainPropertiesRef = React.useRef<any>(null);

  const buttonSaveProperties = async () => {
    if (mainPropertiesRef && mainPropertiesRef.current) {
      await mainPropertiesRef.current.onSave();
    }
  };

  return (
    <PanelBase
      firstBarChildren={
        <Typography variant="h6">{translate.MainProperties}</Typography>
      }
      footer={
        <div className={css.footer}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={buttonSaveProperties}
          >
            {translate.Save}
          </Button>
        </div>
      }
    >
      <>
        {console.log('FirstTimeShowPanel')}
        <MainProperties ref={mainPropertiesRef} />
      </>
    </PanelBase>
  );
});

export default FirstTimeShowPanel;

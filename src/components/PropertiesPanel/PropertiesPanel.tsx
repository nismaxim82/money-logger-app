import { observer } from 'mobx-react';
import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Fade,
  AppBar,
  Toolbar,
  Typography,
  Slide,
  IconButton,
  Box,
  Icon,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import classes from './PropertiesPanel.module.css';
import Helpers from '../../utility/Helpers';
import { MenuTypesEnum } from '../../models/Enum';
import useStores from '../../stores/UseStores';
import TranslatesStore from '../../stores/TranslatesStore';
import MainProperties from '../MainProperties/MainProperties';
import PanelBase from '../PanelBase/PanelBase';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modalContainer: {
      zIndex: theme.zIndex.modal,
      background: theme.palette.background.paper,
    },
    firstBar: {
      background: theme.palette.primary.light,
    },
    secondBar: {
      background: theme.palette.primary.dark,
    },
    toolbarIcon: {
      color: theme.palette.background.default,
    },
    body: {
      padding: theme.spacing(2),
    },
  })
);

const PropertiesPanel = observer(() => {
  const { translatesStore }: { translatesStore: TranslatesStore } = useStores();

  const { translate } = translatesStore;

  const history = useHistory();

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  const mainPropertiesRef = React.useRef<any>(null);
  const cancelEdit = () => {
    history.push(`/${MenuTypesEnum.Menu}`);
  };
  const saveEdit = async () => {
    if (mainPropertiesRef && mainPropertiesRef.current) {
      const result = await mainPropertiesRef.current.onSave();
      if (result) {
        history.push(`/${MenuTypesEnum.Menu}`);
      }
    }
  };

  return (
    <PanelBase
      firstBarChildren={
        <Typography variant="h6">{translate.MainProperties}</Typography>
      }
      secondBarChildren={
        <>
          <Box className={css.emptyBox} />
          <IconButton onClick={cancelEdit}>
            <Icon className={css.toolbarIcon}>close</Icon>
          </IconButton>
          <IconButton onClick={saveEdit}>
            <Icon className={css.toolbarIcon}>done</Icon>
          </IconButton>
        </>
      }
    >
      <MainProperties ref={mainPropertiesRef} />
    </PanelBase>
  );
});

export default PropertiesPanel;

import { observer } from 'mobx-react';
import React from 'react';
import {
  makeStyles,
  createStyles,
  Fade,
  Slide,
  Theme,
} from '@material-ui/core';
import classes from './FirstTimeShowPanel.module.css';
import Helpers from '../../utility/Helpers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modalContainer: {
      zIndex: theme.zIndex.modal,
      background: theme.palette.background.paper,
    },
  })
);

const FirstTimeShowPanel = observer(() => {
  // const { appStore }: { appStore: AppStore } = useStores();

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  return (
    <Fade in timeout={1000}>
      <Slide direction="up" in mountOnEnter unmountOnExit timeout={300}>
        <div className={css.modalContainer} />
      </Slide>
    </Fade>
  );
});

export default FirstTimeShowPanel;

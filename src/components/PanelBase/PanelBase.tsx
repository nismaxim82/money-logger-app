import React, { ReactNode } from 'react';
import {
  Fade,
  Slide,
  makeStyles,
  Theme,
  createStyles,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import Helpers from '../../utility/Helpers';
import classes from './PanelBase.module.css';

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
    body: {
      padding: theme.spacing(2),
    },
  })
);

interface IProps {
  children: ReactNode;
  firstBarChildren?: ReactNode;
  secondBarChildren?: ReactNode;
}

const PanelBase = React.memo((props: IProps) => {
  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  const { children, firstBarChildren, secondBarChildren } = props;

  return (
    <Fade in timeout={1000}>
      <Slide direction="up" in mountOnEnter unmountOnExit timeout={300}>
        <div className={css.modalContainer}>
          <AppBar position="static" className={css.firstBar}>
            <Toolbar>{firstBarChildren}</Toolbar>
          </AppBar>
          <AppBar position="static" color="primary" className={css.secondBar}>
            <Toolbar>{secondBarChildren}</Toolbar>
          </AppBar>
          <div className={css.body}>{children}</div>
        </div>
      </Slide>
    </Fade>
  );
});

export default PanelBase;

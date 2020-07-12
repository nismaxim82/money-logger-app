import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Snackbar,
  Icon,
} from '@material-ui/core';
import classes from './SnackErrors.module.css';
import Helpers from '../../utility/Helpers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    errors: {
      color: theme.palette.error.main,
    },
  })
);

interface IProps {
  open: boolean;
  errors: string[];
  onClose: () => void;
}

const SnackErrors = (props: IProps) => {
  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  const [openSnack, setOpenSnack] = React.useState(false);
  const { open, errors } = props;
  React.useEffect(() => {
    setOpenSnack(open);
  }, [open]);

  const closeHandle = () => {
    setOpenSnack(false);
    props.onClose();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={openSnack}
      onClose={closeHandle}
      autoHideDuration={6000}
      message={
        <div className={css.errors}>
          {errors.map((e) => (
            <div key={e}>{e}</div>
          ))}
        </div>
      }
      action={
        <Icon fontSize="small" color="inherit" onClick={closeHandle}>
          close
        </Icon>
      }
    />
  );
};

export default SnackErrors;

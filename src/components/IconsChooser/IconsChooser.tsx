import {
  createStyles,
  FormControlLabel,
  Icon,
  Input,
  InputAdornment,
  makeStyles,
  Radio,
  Theme,
} from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import Helpers from '../../utility/Helpers';
import classes from './IconsChooser.module.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      marginTop: theme.spacing(2),
    },
  })
);

const IconsChooser = observer(() => {
  // const { appStore }: { appStore: AppStore } = useStores();

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  return (
    <>
      <Input
        fullWidth
        placeholder="Enter icon name to search"
        startAdornment={
          <InputAdornment position="start">
            <Icon>search</Icon>
          </InputAdornment>
        }
      />
      <div className={css.grid}>
        <FormControlLabel
          checked
          value="Filled"
          control={<Radio color="primary" />}
          label="Filled"
          labelPlacement="top"
        />
        <FormControlLabel
          value="Outlined"
          control={<Radio color="primary" />}
          label="Outlined"
          labelPlacement="top"
        />
        <FormControlLabel
          value="Rounded"
          control={<Radio color="primary" />}
          label="Rounded"
          labelPlacement="top"
        />
        <FormControlLabel
          value="Two tone"
          control={<Radio color="primary" />}
          label="Two tone"
          labelPlacement="top"
        />
        <FormControlLabel
          value="Sharp"
          control={<Radio color="primary" />}
          label="Sharp"
          labelPlacement="top"
        />
      </div>
    </>
  );
});

export default IconsChooser;

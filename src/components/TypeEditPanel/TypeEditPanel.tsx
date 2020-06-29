import {
  AppBar,
  Box,
  createStyles,
  Fade,
  IconButton,
  makeStyles,
  MenuItem,
  Slide,
  TextField,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core';
import { Close as CloseIcon, Done as DoneIcon } from '@material-ui/icons';
import { observer } from 'mobx-react';
import React from 'react';
import { ChromePicker } from 'react-color';
import Helpers from '../../utility/Helpers';
import classes from './TypeEditPanel.module.css';

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
    closeIcon: {
      color: theme.palette.background.default,
    },
    doneIcon: {
      color: theme.palette.background.default,
    },
    body: {
      padding: theme.spacing(2),
      gridGap: theme.spacing(2),
    },
  })
);

const TypeEditPanel = observer(() => {
  // const { appStore }: { appStore: AppStore } = useStores();

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);
  const theme = useTheme();

  const [colorPickerOpened, setColorPickerOpened] = React.useState(false);
  const [color, setColor] = React.useState(theme.palette.primary.main);
  const colorChange = (pickerProps: any) => {
    setColor(pickerProps.hex);
  };

  const iconChange = () => {};

  return (
    <Fade in timeout={1000}>
      <Slide direction="up" in mountOnEnter unmountOnExit timeout={300}>
        <div className={css.modalContainer}>
          <AppBar position="static" className={css.firstBar}>
            <Toolbar>
              <Typography variant="h6">Новый тип</Typography>
            </Toolbar>
          </AppBar>
          <AppBar position="static" color="primary" className={css.secondBar}>
            <Toolbar>
              <Box className={css.emptyBox} />
              <IconButton>
                <CloseIcon className={css.closeIcon} />
              </IconButton>
              <IconButton>
                <DoneIcon className={css.doneIcon} />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={css.body}>
            <TextField
              error
              fullWidth
              label="Name"
              helperText="Type name is required"
            />
            <TextField
              select
              fullWidth
              label="Color"
              value={0}
              onChange={colorChange}
              style={{ color }}
            >
              <MenuItem value={0}>{color}</MenuItem>
            </TextField>
            <TextField
              select
              fullWidth
              label="Icon"
              value={0}
              onChange={iconChange}
            >
              <MenuItem value={0}>Icon</MenuItem>
            </TextField>
          </div>
          {colorPickerOpened && (
            <ChromePicker color={color} onChange={colorChange} />
          )}
        </div>
      </Slide>
    </Fade>
  );
});

export default TypeEditPanel;

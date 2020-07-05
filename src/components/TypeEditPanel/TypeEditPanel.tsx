import {
  AppBar,
  Backdrop,
  Box,
  Button,
  ClickAwayListener,
  createStyles,
  Dialog,
  Fade,
  Icon,
  IconButton,
  InputAdornment,
  makeStyles,
  MenuItem,
  Paper,
  Popper,
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
import IconsChooser from '../IconsChooser/IconsChooser';
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
    backdrop: {
      zIndex: theme.zIndex.modal,
    },
    colorDialogBox: {
      // background: theme.palette.background.paper,
      zIndex: theme.zIndex.modal,
    },
    colorDialogHeader: {
      minHeight: theme.mixins.toolbar.minHeight,
      background: theme.palette.primary.light,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      color: theme.palette.background.default,
    },
    colorDialogBody: {
      padding: theme.spacing(2),
    },
    colorDialogFooter: {
      padding: theme.spacing(2),
      gridGap: theme.spacing(2),
    },
    iconDialogBox: {
      // background: theme.palette.background.paper,
      // zIndex: theme.zIndex.modal,
    },
    iconDialogHeader: {
      minHeight: theme.mixins.toolbar.minHeight,
      background: theme.palette.primary.light,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      color: theme.palette.background.default,
    },
    iconDialogBody: {
      padding: theme.spacing(2),
      paddingBottom: 0,
    },
    iconDialogFooter: {
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

  const colorRef = React.useRef<HTMLDivElement>(null);
  const [colorPickerOpened, setColorPickerOpened] = React.useState(false);
  const colorHandleOpen = () => {
    setColorPickerOpened(true);
  };
  const colorHandleClose = () => {
    setColorPickerOpened(false);
  };
  const [color, setColor] = React.useState(theme.palette.primary.main);
  const [appliedColor, setAppliedColor] = React.useState(
    theme.palette.primary.main
  );
  const colorChange = (pickerProps: any) => {
    setColor(pickerProps.hex);
  };
  const applyColorSelect = () => {
    setAppliedColor(color);
    colorHandleClose();
  };
  const cancelColorSelect = () => {
    setColor(appliedColor);
    colorHandleClose();
  };

  const iconRef = React.useRef<HTMLDivElement>(null);
  const [iconPickerOpened, setIconPickerOpened] = React.useState(false);
  const iconHandleOpen = () => {
    setIconPickerOpened(true);
  };
  const iconHandleClose = () => {
    setIconPickerOpened(false);
  };
  const [icon, setIcon] = React.useState('');
  const [appliedIcon, setAppliedIcon] = React.useState('');
  const iconChange = (newIcon: string) => {
    setIcon(newIcon);
  };
  const applyIconSelect = () => {
    setAppliedIcon(icon);
    iconHandleClose();
  };
  const cancelIconSelect = () => {
    setIcon(appliedColor);
    iconHandleClose();
  };

  return (
    <Fade in timeout={1000}>
      <Slide direction="up" in mountOnEnter unmountOnExit timeout={300}>
        <div className={css.modalContainer}>
          <Box
            className={css.overlay}
            style={{ display: colorPickerOpened ? 'block' : 'none' }}
          />
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
              fullWidth
              label="Position"
              helperText="If empty then it will be placed to the end of list"
            />
            <TextField
              ref={colorRef}
              select
              disabled
              fullWidth
              label="Color"
              InputLabelProps={{ style: { color: appliedColor } }}
              SelectProps={{ style: { color: appliedColor } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>stop</Icon>
                  </InputAdornment>
                ),
              }}
              value={0}
              onClick={colorHandleOpen}
            >
              <MenuItem value={0}>{appliedColor}</MenuItem>
            </TextField>
            <Backdrop open={colorPickerOpened} className={css.backdrop}>
              <Popper
                open={colorPickerOpened}
                anchorEl={colorRef.current}
                role={undefined}
                transition
                disablePortal
                className={css.colorDialogBox}
              >
                <ClickAwayListener onClickAway={colorHandleClose}>
                  <Paper>
                    <div className={css.colorDialogHeader}>
                      <Typography variant="h6">Выберите цвет</Typography>
                    </div>
                    <div className={css.colorDialogBody}>
                      <ChromePicker color={color} onChange={colorChange} />
                    </div>
                    <div className={css.colorDialogFooter}>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={applyColorSelect}
                      >
                        Выбрать
                      </Button>
                      <Button variant="contained" onClick={cancelColorSelect}>
                        Отмена
                      </Button>
                    </div>
                  </Paper>
                </ClickAwayListener>
              </Popper>
            </Backdrop>
            <TextField
              ref={iconRef}
              select
              disabled
              fullWidth
              label="Icon"
              value={0}
              SelectProps={{ style: { color: appliedColor } }}
              onClick={iconHandleOpen}
            >
              <MenuItem value={0}>
                <Icon>apps</Icon>
              </MenuItem>
            </TextField>
            <Dialog
              open={iconPickerOpened}
              className={css.iconDialogBox}
              fullScreen
            >
              <Paper className={css.iconDialogBox}>
                <div className={css.iconDialogHeader}>
                  <Typography variant="h6">Выберите иконку</Typography>
                </div>
                <div className={css.iconDialogBody}>
                  <IconsChooser />
                </div>
                <div className={css.iconDialogFooter}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={applyIconSelect}
                  >
                    Выбрать
                  </Button>
                  <Button variant="contained" onClick={cancelIconSelect}>
                    Отмена
                  </Button>
                </div>
              </Paper>
            </Dialog>
          </div>
        </div>
      </Slide>
    </Fade>
  );
});

export default TypeEditPanel;

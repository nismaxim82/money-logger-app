import {
  AppBar,
  Box,
  Button,
  createStyles,
  Dialog,
  Fade,
  Icon,
  IconButton,
  InputAdornment,
  makeStyles,
  MenuItem,
  Paper,
  Slide,
  TextField,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { ChromePicker } from 'react-color';
import { useHistory } from 'react-router-dom';
import { MenuTypesEnum } from '../../models/Enum';
import TypesStore from '../../stores/TypesStore';
import useStores from '../../stores/UseStores';
import Helpers from '../../utility/Helpers';
import IconsChooser from '../IconsChooser/IconsChooser';
import classes from './TypeEditPanel.module.css';
import TranslatesStore from '../../stores/TranslatesStore';

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
      gridGap: theme.spacing(2),
    },
    colorAndIconContainer: {
      gridGap: theme.spacing(2),
    },
    colorDialogBox: {
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

interface IProps {
  match: any;
}

const TypeEditPanel = observer((props: IProps) => {
  const {
    typesStore,
    translatesStore,
  }: { typesStore: TypesStore; translatesStore: TranslatesStore } = useStores();

  const { translate } = translatesStore;

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);
  const theme = useTheme();

  const [typeId, setTypeId] = React.useState('');
  const [color, setColor] = React.useState('');
  const [colorPickerOpened, setColorPickerOpened] = React.useState(false);
  const [icon, setIcon] = React.useState('');
  const [iconPickerOpened, setIconPickerOpened] = React.useState(false);

  const history = useHistory();
  React.useEffect(() => {
    setTypeId(props.match.params?.id);
    if (typesStore.typesLoaded) {
      typesStore.getTypeToSaveByName(typeId);
      setColor(typesStore.typeToSave?.iconColor || '');
    }
  }, [props.match.params, typeId, typesStore, typesStore.typesLoaded]);

  const deleteType = async () => {
    await typesStore.deleteType(typeId);
    history.push(`/${MenuTypesEnum.Types}`);
  };
  const cancelEdit = () => {
    history.push(`/${MenuTypesEnum.Types}`);
  };
  const saveEdit = async () => {
    if (typesStore.validateTypeToSave()) {
      await typesStore.saveType(typeId);
      history.push(`/${MenuTypesEnum.Types}`);
    }
  };

  const changeTypeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    const prop = event.currentTarget.dataset.propName!;
    typesStore.updateTypeToSaveByProp(prop, newValue);
  };

  const positionFieldFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.currentTarget.select();
  };

  const getAppliedColor = () => {
    return typesStore.getColorInHex(theme, typesStore.typeToSave?.iconColor);
  };

  const colorHandleOpen = () => {
    setColorPickerOpened(true);
  };
  const colorHandleClose = () => {
    setColorPickerOpened(false);
  };
  const pickerColorChange = (pickerProps: any) => {
    setColor(pickerProps.hex);
  };
  const buttonApplyColorSelect = () => {
    typesStore.updateTypeToSaveByProp('iconColor', color);
    colorHandleClose();
  };
  const buttonCancelColorSelect = () => {
    setColor(getAppliedColor());
    colorHandleClose();
  };

  const iconHandleOpen = () => {
    setIconPickerOpened(true);
  };
  const iconHandleClose = () => {
    setIconPickerOpened(false);
  };
  const iconChange = (newIcon: string) => {
    setIcon(newIcon);
  };
  const buttonApplyIconSelect = () => {
    typesStore.updateTypeToSaveByProp('icon', icon);
    iconHandleClose();
  };
  const buttonCancelIconSelect = () => {
    setIcon(typesStore.typeToSave?.icon || '');
    iconHandleClose();
  };

  return (
    <Fade in timeout={1000}>
      <Slide direction="up" in mountOnEnter unmountOnExit timeout={300}>
        <div className={css.modalContainer}>
          <AppBar position="static" className={css.firstBar}>
            <Toolbar>
              <Typography variant="h6">
                {typeId ? translate.TypeEdit : translate.TypeNew}
              </Typography>
            </Toolbar>
          </AppBar>
          <AppBar position="static" color="primary" className={css.secondBar}>
            <Toolbar>
              <Box className={css.emptyBox} />
              {typeId && (
                <IconButton onClick={deleteType}>
                  <Icon className={css.toolbarIcon}>delete_forever</Icon>
                </IconButton>
              )}
              <IconButton onClick={cancelEdit}>
                <Icon className={css.toolbarIcon}>close</Icon>
              </IconButton>
              <IconButton onClick={saveEdit}>
                <Icon className={css.toolbarIcon}>done</Icon>
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={css.body}>
            <TextField
              error={!typesStore.typeToSave?.name}
              fullWidth
              label="ID"
              disabled={!!typeId}
              value={typesStore.typeToSave?.name || ''}
              onChange={changeTypeField}
              inputProps={{ 'data-prop-name': 'name' }}
              helperText={
                !typesStore.typeToSave?.name ? translate.IDIsRequired : ''
              }
            />
            <TextField
              error={!typesStore.typeToSave?.label}
              fullWidth
              label={translate.Name}
              value={typesStore.typeToSave?.label || ''}
              onChange={changeTypeField}
              inputProps={{ 'data-prop-name': 'label' }}
              helperText={
                !typesStore.typeToSave?.label ? translate.NameIsRequired : ''
              }
            />
            <TextField
              error={
                !typesStore.typeToSave?.position &&
                typesStore.typeToSave?.position !== 0
              }
              fullWidth
              label={translate.PositionInTheList}
              value={
                typesStore.typeToSave?.position ||
                typesStore.typeToSave?.position === 0
                  ? typesStore.typeToSave?.position
                  : ''
              }
              onChange={changeTypeField}
              type="number"
              inputProps={{ 'data-prop-name': 'position' }}
              onFocus={positionFieldFocus}
              helperText={
                !typesStore.typeToSave?.position &&
                typesStore.typeToSave?.position !== 0
                  ? translate.PositionInTheListIsRequired
                  : ''
              }
            />
            <div className={css.colorAndIconContainer}>
              <TextField
                select
                disabled
                fullWidth
                label={translate.IconColor}
                className={css.dialogSelect}
                SelectProps={{ style: { color: getAppliedColor() } }}
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
                <MenuItem value={0}>{getAppliedColor()}</MenuItem>
              </TextField>
              <TextField
                select
                disabled
                fullWidth
                label={translate.Icon}
                value={typesStore.typeToSave?.icon ? '0' : ''}
                SelectProps={{ style: { color: getAppliedColor() } }}
                onClick={iconHandleOpen}
              >
                <MenuItem value="0">
                  <Icon>{typesStore.typeToSave?.icon}</Icon>
                </MenuItem>
              </TextField>
            </div>
            <Dialog
              open={colorPickerOpened}
              className={css.colorDialogBox}
              fullScreen
            >
              <Paper className={css.colorDialogBox}>
                <div className={css.colorDialogHeader}>
                  <Typography variant="h6">
                    {translate.SelectTheColorOfTheIcon}
                  </Typography>
                </div>
                <div className={css.colorDialogBody}>
                  <ChromePicker color={color} onChange={pickerColorChange} />
                </div>
                <div className={css.colorDialogFooter}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={buttonApplyColorSelect}
                  >
                    {translate.Select}
                  </Button>
                  <Button variant="contained" onClick={buttonCancelColorSelect}>
                    {translate.Cancel}
                  </Button>
                </div>
              </Paper>
            </Dialog>
            <Dialog
              open={iconPickerOpened}
              className={css.iconDialogBox}
              fullScreen
            >
              <Paper className={css.iconDialogBox}>
                <div className={css.iconDialogHeader}>
                  <Typography variant="h6">{translate.SelectIcon}</Typography>
                </div>
                <div className={css.iconDialogBody}>
                  <IconsChooser
                    selectedIcon={typesStore.typeToSave?.icon}
                    selectedIconChanged={iconChange}
                  />
                </div>
                <div className={css.iconDialogFooter}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={buttonApplyIconSelect}
                  >
                    {translate.Select}
                  </Button>
                  <Button variant="contained" onClick={buttonCancelIconSelect}>
                    {translate.Cancel}
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

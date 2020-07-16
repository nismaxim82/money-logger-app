import { observer } from 'mobx-react';
import React from 'react';
import {
  Fade,
  Slide,
  makeStyles,
  Theme,
  createStyles,
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Icon,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import classes from './IncomesPanel.module.css';
import Helpers from '../../utility/Helpers';
import useStores from '../../stores/UseStores';
import TranslatesStore from '../../stores/TranslatesStore';
import { MenuTypesEnum } from '../../models/Enum';

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

const IncomesPanel = observer(() => {
  const { translatesStore }: { translatesStore: TranslatesStore } = useStores();

  const { translate } = translatesStore;

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  const history = useHistory();

  const buttonBackClick = () => {
    history.push(`/${MenuTypesEnum.Menu}`);
  };

  const buttonAddIncomeClick = () => {};

  const buttonApplyFilterClick = () => {};

  return (
    <Fade in timeout={1000}>
      <Slide direction="up" in mountOnEnter unmountOnExit timeout={300}>
        <div className={css.modalContainer}>
          <AppBar position="static" className={css.firstBar}>
            <Toolbar>
              <Typography variant="h6">{translate.Incomes}</Typography>
            </Toolbar>
          </AppBar>
          <AppBar position="static" color="primary" className={css.secondBar}>
            <Toolbar>
              <IconButton onClick={buttonBackClick}>
                <Icon className={css.toolbarIcon}>arrow_back_ios</Icon>
              </IconButton>
              <Box className={css.emptyBox} />
              <IconButton onClick={buttonAddIncomeClick}>
                <Icon className={css.toolbarIcon}>plus_one</Icon>
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={css.body}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                <Typography className={classes.heading}>
                  {translate.IncomesFilter}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <TextField
                  select
                  fullWidth
                  label={translate.IncomeType}
                  value=""
                >
                  <MenuItem value={1}>{translate.Periodic}</MenuItem>
                  <MenuItem value={2}>{translate.Fixed}</MenuItem>
                </TextField>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={buttonApplyFilterClick}
                >
                  {translate.ApplyFilter}
                </Button>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </div>
      </Slide>
    </Fade>
  );
});

export default IncomesPanel;

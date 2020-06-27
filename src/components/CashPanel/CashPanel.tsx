import { Box, createStyles, makeStyles, Theme } from '@material-ui/core';
import { Fastfood as FastfoodIcon } from '@material-ui/icons';
import React from 'react';
import TabPanel from '../TabPanel/TabPanel';
import classes from './CashPanel.module.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      fontSize: theme.typography.h1.fontSize,
    },
    foodIcon: {
      color: '#dd0f1d',
      fontSize: theme.typography.body1.fontSize,
    },
  })
);

interface IProps {
  value: number;
}

const CashPanel = (props: IProps) => {
  const { value } = props;
  const styles = useStyles();

  return (
    <TabPanel
      id="menu-tab-panel"
      labelledby="menu-tab-panel"
      value={value}
      index={0}
      other={{ className: classes.tabPanel }}
    >
      <Box className={classes.card}>
        <FastfoodIcon className={styles.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
      <Box className={classes.card}>
        <FastfoodIcon className={classes.foodIcon} />
        <div>Еда</div>
      </Box>
    </TabPanel>
  );
};

export default CashPanel;

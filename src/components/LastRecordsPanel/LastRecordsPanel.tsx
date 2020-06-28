import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import AppStore from '../../stores/AppStore';
import useStores from '../../stores/UseStores';
import Helpers from '../../utility/Helpers';
import TabPanel from '../TabPanel/TabPanel';
import classes from './LastRecordsPanel.module.css';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const LastRecordsPanel = observer(() => {
  const { appStore }: { appStore: AppStore } = useStores();

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  return (
    <TabPanel
      id="menu-last-records-tab-panel"
      labelledby="menu-last-records-tab-panel"
      value={appStore.selectedMenuIndex}
      index={1}
      other={{ className: css.tabPanel }}
    >
      <div>Test</div>
    </TabPanel>
  );
});

export default LastRecordsPanel;

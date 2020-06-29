import { Tab } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';

// const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface IProps {
  label?: string;
  to: string;
  icon?: any;
  currentUrl?: string;
}

const LinkTab = observer((props: IProps) => {
  // const styles = useStyles();
  // const css = Helpers.combineStyles(styles, classes);

  const linkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (props.currentUrl === event.currentTarget.pathname) {
      event.preventDefault();
    }
  };

  return (
    <Tab
      component={Link}
      to={props.to}
      label={props.label}
      icon={props.icon}
      onClick={linkClick}
    />
  );
});

export default LinkTab;

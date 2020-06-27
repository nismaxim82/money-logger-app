import React from 'react';

interface IProps {
  children: any;
  id: string;
  labelledby: string;
  value: number;
  index: number;
  other?: any;
}

const TabPanel = (props: IProps) => {
  const { children, id, labelledby, value, index, other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${id}-${index}`}
      aria-labelledby={`${labelledby}-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

export default TabPanel;

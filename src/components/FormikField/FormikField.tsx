import { TextField, StandardTextFieldProps } from '@material-ui/core';
import React from 'react';

interface IProps extends StandardTextFieldProps {
  name: string;
  label?: string;
  values: any;
  errors: any;
  touched: any;
  handleChange?: (e: React.ChangeEvent<any>) => void;
  handleBlur?: (e: React.FocusEvent<any>) => void;
}

const areEqual = (prevProps: any, nextProps: any) => {
  // console.log('prev', prevProps);
  // console.log('next', nextProps);
  Object.keys(prevProps).forEach((k) => {
    if (prevProps[k] !== nextProps[k]) {
      console.log(`%c ${k}`, 'color: red');
      console.log('prev', prevProps[k]);
      console.log('next', nextProps[k]);
    }
  });
  return false;
};

const FormikField = React.memo((props: IProps) => {
  const {
    name,
    label,
    children,
    fullWidth,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    ...otherProps
  } = props;

  // console.log('FormikField', name, props);

  return (
    <TextField
      fullWidth={fullWidth !== undefined ? fullWidth : true}
      name={name}
      value={values[name]}
      label={label}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(errors[name] && touched[name])}
      helperText={errors[name] && touched[name] && String(errors[name])}
      {...otherProps}
    >
      {children}
    </TextField>
  );
}, areEqual);

export default FormikField;

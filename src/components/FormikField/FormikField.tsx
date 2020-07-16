import { TextField, StandardTextFieldProps } from '@material-ui/core';
import React from 'react';

interface IProps extends StandardTextFieldProps {
  formik: any;
  name: string;
  label?: string;
}

const FormikField = React.memo((props: IProps) => {
  const { formik, name, label, children, fullWidth, ...otherProps } = props;

  return (
    <TextField
      fullWidth
      name={name}
      value={formik.values[name]}
      label={label}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={Boolean(formik.errors[name] && formik.touched[name])}
      helperText={
        formik.errors[name] &&
        formik.touched[name] &&
        String(formik.errors[name])
      }
      {...otherProps}
    >
      {children}
    </TextField>
  );
});

export default FormikField;

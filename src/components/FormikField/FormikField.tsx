import { TextField, StandardTextFieldProps } from '@material-ui/core';
import React from 'react';
import { useField } from 'formik';

interface IProps extends StandardTextFieldProps {
  name: string;
  label?: string;
}

// const areEqual = (prevProps: any, nextProps: any) => {
//   // console.log('prev', prevProps);
//   // console.log('next', nextProps);
//   Object.keys(prevProps).forEach((k) => {
//     if (prevProps[k] !== nextProps[k]) {
//       console.log(`%c ${k}`, 'color: red');
//       console.log('prev', prevProps[k]);
//       console.log('next', nextProps[k]);
//     }
//   });
//   return false;
// };

const FormikField = React.memo((props: IProps) => {
  const { name, label, children, fullWidth, ...otherProps } = props;

  const [field, meta] = useField({ name, type: name });

  console.log(`%c FormikField ${name}`, 'color: red');
  return (
    <TextField
      fullWidth={fullWidth !== undefined ? fullWidth : true}
      label={label}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.error}
      {...field}
      {...otherProps}
    >
      {children}
    </TextField>
  );
});

export default FormikField;

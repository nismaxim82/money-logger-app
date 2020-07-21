import React from 'react';
import {
  RadioGroup,
  RadioGroupProps,
  FormControlLabel,
  Radio,
  Typography,
} from '@material-ui/core';

interface IProps extends RadioGroupProps {
  name: string;
  label?: string;
  horizontal?: boolean;
  options: { value: string | number; label: string }[];
  values: any;
  errors: any;
  touched: any;
  errorClassName?: string;
}

// const areEqual = (prevProps: any, nextProps: any) => {
//   // console.log('prev', prevProps);
//   // console.log('next', nextProps);
//   Object.keys(prevProps).forEach((k) => {
//     if (prevProps[k] !== nextProps[k]) {
//       console.log(k);
//       console.log('prev', prevProps[k]);
//       console.log('next', nextProps[k]);
//     }
//   });
//   return false;
// };

const FormikRadioGroup = React.memo((props: IProps) => {
  const {
    name,
    label,
    horizontal,
    options,
    values,
    errors,
    touched,
    errorClassName,
    ...otherProps
  } = props;

  // console.log('FormikRadioGroup', props);
  return (
    <>
      {label && <Typography variant="caption">{label}</Typography>}
      <RadioGroup
        {...otherProps}
        name={name}
        value={values[name]}
        style={horizontal ? { flexDirection: 'row' } : {}}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>

      {Boolean(errors[name] && touched[name]) && (
        <div className={errorClassName || ''}>{errors[name]}</div>
      )}
    </>
  );
});

export default FormikRadioGroup;

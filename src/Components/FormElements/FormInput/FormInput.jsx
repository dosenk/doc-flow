import React from 'react';
import { useField } from 'formik';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const FormInput = ({ label, placeholder, size = 'medium', ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setTouched } = helpers;
  const { onChange } = field;

  const handleChange = (e) => {
    onChange(e);
    setTouched(false);
  };

  return (
    <FormControl
      margin="dense"
      sx={{ height: size === 'small' ? '44px' : '60px', marginTop: '0px' }}
    >
      <TextField
        label={label}
        placeholder={placeholder}
        onChange={handleChange}
        name={field.name}
        value={field.value}
        size={size}
        error={!!error && touched}
        {...props}
      />
      {!!error && touched ? (
        <FormHelperText error={!!error && touched} sx={{ marginTop: '0px' }}>
          {error}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default FormInput;

FormInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string
};

FormInput.defaultProps = {
  size: 'medium'
};

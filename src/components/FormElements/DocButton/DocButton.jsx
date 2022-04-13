import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const DocButton = ({ variant, size, disabled, color, ...props }) => {
  return <Button variant={variant} size={size} disabled={disabled} color={color} {...props} />;
};

DocButton.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool
};

DocButton.defaultProps = {
  variant: 'contained',
  size: 'small',
  color: 'primary'
};

export default DocButton;

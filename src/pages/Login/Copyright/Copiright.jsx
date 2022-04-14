import { Typography, Link } from '@mui/material';
import React from 'react';

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com">
        00014
      </Link>
      {` ${new Date().getFullYear()}`}.
    </Typography>
  );
};

export default Copyright;

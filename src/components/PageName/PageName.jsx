import { Divider, Typography, Box, LinearProgress } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const PageName = ({ value, isLoading }) => {
  return (
    <Box
      style={{
        padding: '4px 11px 0px 11px',
        backgroundColor: '#fff',
        zIndex: 1000
      }}
    >
      <Typography variant="h5" className="page-name">
        {value}
      </Typography>
      {isLoading ? <LinearProgress style={{ height: '1px' }} /> : <Divider />}
    </Box>
  );
};

export default PageName;

PageName.propTypes = {
  value: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};

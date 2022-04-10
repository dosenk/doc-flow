import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const UserRow = ({ row }) => {
  const { status } = row.original;
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography
        style={{
          background: status ? 'green' : 'red',
          borderRadius: '20px',
          width: '120px',
          color: '#fff'
        }}
        variant="subtitle2"
        gutterBottom
        // component="div"
      >
        {status ? 'активный' : 'неактивный'}
      </Typography>
    </Box>
  );
};

export default UserRow;

UserRow.propTypes = {
  row: PropTypes.shape({ original: PropTypes.shape({ status: PropTypes.string }) }).isRequired
};

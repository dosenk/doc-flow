import { CircularProgress } from '@mui/material';
import React from 'react';

const Preloader = () => {
  return (
    <CircularProgress
      style={{
        position: 'absolute',
        left: '47%',
        top: '47%'
      }}
      className="preloader"
    />
  );
};

export default Preloader;

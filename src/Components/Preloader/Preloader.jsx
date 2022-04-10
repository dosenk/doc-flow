import { CircularProgress } from '@mui/material';

const Preloader = () => {
  return (
    <CircularProgress
      style={{
        position: 'absolute',
        left: '47%',
        top: '47%',
      }}
      className="preloader"
    />
  );
};

export default Preloader;

import React from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import cl from './footer.module.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={`${cl.footer} ${classes.root}`}>
      <Box>00014</Box>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;

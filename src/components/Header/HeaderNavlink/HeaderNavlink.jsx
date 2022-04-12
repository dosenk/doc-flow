import React from 'react';
import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import cl from '../header.module.scss';
import { PAGES } from '../header.const';

const HeaderNavlink = () => {
  return (
    <Box className={cl.appbar__container}>
      {PAGES.map((page) => {
        return (
          <NavLink to={page.link} key={page.link} style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              key={page.link}
              size="small"
              className={cl.appbar__container_button}
            >
              {page.value}
            </Button>
          </NavLink>
        );
      })}
    </Box>
  );
};

HeaderNavlink.propTypes = {};

export default HeaderNavlink;

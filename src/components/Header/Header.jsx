import React, { useState } from 'react';
import { Mail as MailIcon } from '@mui/icons-material';
import { Badge, Container, Typography, Toolbar, Box, AppBar } from '@mui/material';
import cl from './header.module.scss';
import UserMenu from './UserMenu/UserMenu';
import HeaderNavlink from './HeaderNavlink/HeaderNavlink';

const Header = () => {
  return (
    <AppBar className={cl.appbar}>
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <Typography variant="h5" noWrap component="div">
            Модуль документооборота
          </Typography>
          <HeaderNavlink />
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Badge badgeContent={1} color="error">
              <MailIcon color="action" />
            </Badge>
          </Box>
          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

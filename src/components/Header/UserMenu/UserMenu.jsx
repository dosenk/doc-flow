import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { MENU_CONFIG, SETTINGS } from '../header.const';
import cl from '../header.module.scss';
import { signOutAction } from '../../../store/auth/authActions';
import { removeAccessToken } from '../../../services/auth.service';

const UserMenu = () => {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    dispatch(signOutAction());
    removeAccessToken();
  };
  const menuActions = { handleLogout };

  return (
    <>
      <Box className={cl.appbar__user}>
        <Tooltip title="Пользователь">
          <IconButton onClick={handleOpenUserMenu} className={cl.appbar__user_iconButton}>
            <AccountCircleIcon className={cl.appbar__user_icon} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={MENU_CONFIG}
        keepMounted
        transformOrigin={MENU_CONFIG}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {SETTINGS.map((setting) => (
          <MenuItem key={setting.name}>
            <Typography textAlign="center">
              <NavLink
                className={cl.appbar__menu_navlink}
                to={setting.link}
                onClick={menuActions[setting.action]}
              >
                {setting.name}
              </NavLink>
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

UserMenu.propTypes = {};

export default UserMenu;

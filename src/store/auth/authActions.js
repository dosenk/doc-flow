// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateAccessToken } from '../../services/auth.service';
import { signOutApi } from '../../api/authApi';

export const signInAction = createAsyncThunk('auth/signIn', async ({ login, password }) => {
  const accessToken = await updateAccessToken('login', { login, password });
  return jwt_decode(accessToken);
});

export const signOutAction = createAsyncThunk('auth/signOut', async () => {
  await signOutApi();
});

export const checkAuthAction = createAsyncThunk('auth/check', async () => {
  const accessToken = await updateAccessToken('update');
  return jwt_decode(accessToken);
});

signInAction.propTypes = {
  login: PropTypes.string,
  password: PropTypes.string
};

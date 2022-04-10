// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';
import { signOutApi } from '../api/authApi';
import { getAccessToken, removeAccessToken, updateAccessToken } from '../services/auth.service';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';

const authState = {
  isLoading: true,
  isLogin: false,
  error: '',
  data: {
    login: null,
    id: null,
    status: false,
    role: null
  }
};

export const signInAction = (login, password) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    const accessToken = await updateAccessToken('login', { login, password });
    dispatch({
      type: LOGIN,
      data: jwt_decode(accessToken)
    });
  } catch (e) {
    dispatch({ type: ERROR, data: e.message });
  }
};

export const signOutAction = () => async (dispatch) => {
  dispatch({ type: LOADING });
  await signOutApi();
  removeAccessToken();
  dispatch({ type: LOGOUT });
};

export const checkAuthAction = () => async (dispatch) => {
  if (getAccessToken()) {
    dispatch({ type: LOADING });
    const accessToken = await updateAccessToken('update');
    dispatch({
      type: LOGIN,
      data: jwt_decode(accessToken)
    });
  } else dispatch({ type: LOGOUT });
};

export const setErrorAction =
  (data = '') =>
  async (dispatch) => {
    dispatch({ type: ERROR, data });
  };

const authReducer = (action, state = authState) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case LOGIN:
      return { data: action.data, isLogin: true, isLoading: false };
    case LOGOUT:
      return { ...authState, isLoading: false };
    case ERROR:
      return { ...state, isLoading: false, error: action.data };
    default:
      return { ...state, isLoading: false };
  }
};

export default authReducer;

signInAction.propTypes = {
  login: PropTypes.string,
  password: PropTypes.string
};

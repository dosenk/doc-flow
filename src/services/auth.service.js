import PropTypes from 'prop-types';
import { getTokenApi } from '../api/authApi';

const setAccessToken = (accessToken) => {
  localStorage.setItem('token', accessToken);
};

const removeAccessToken = () => {
  localStorage.removeItem('token');
};

const getAccessToken = () => {
  return localStorage.getItem('token');
};

const updateAccessToken = async (action, data) => {
  const { status, data: receiveData } = await getTokenApi(action, data);

  if (status !== 200) throw new Error(receiveData);

  const { accessToken } = receiveData;

  setAccessToken(accessToken);
  return accessToken;
};

export { setAccessToken, removeAccessToken, getAccessToken, updateAccessToken };

updateAccessToken.propTypes = {
  action: PropTypes.oneOf(['update', 'login']),
  data: PropTypes.shape({ login: PropTypes.string, password: PropTypes.string })
};

setAccessToken.propTypes = {
  accessToken: PropTypes.string.isRequired
};

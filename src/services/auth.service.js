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

  if (status === 'error') throw new Error(receiveData);

  const { accessToken } = receiveData;
  setAccessToken(accessToken);
  return accessToken;
};

export { setAccessToken, removeAccessToken, getAccessToken, updateAccessToken };

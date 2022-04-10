import PropTypes from 'prop-types';
import { $api } from './api';

const updateTokenApi = async () => {
  try {
    return await $api.get(`/api/refresh`, { withCredentials: true });
  } catch (e) {
    return e.response.data;
  }
};

const signInApi = async (data) => {
  try {
    return await $api.post('/api/login', data);
  } catch (e) {
    return e.response.data;
  }
};

export const signOutApi = async () => {
  try {
    return await $api.post('/api/logout');
  } catch (e) {
    return e.response.data;
  }
};

export const getTokenApi = async (action, data = null) => {
  const res = action === 'update' ? await updateTokenApi() : await signInApi(data);
  return res;
};

getTokenApi.prototype = {
  action: PropTypes.oneOf(['update', 'login']),
  data: PropTypes.object
};

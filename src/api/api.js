import axios from 'axios';
import { removeAccessToken, setAccessToken } from '../services/auth.service';
import history from '../components/Router/history';

export const API_URL = process.env.REACT_APP_BASE_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
});

$api.interceptors.request.use((config) => {
  const { headers } = config;
  headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    // console.log(error.response);
    const originalRequest = error.config;
    if (error.response.status === 401) {
      const result = await axios
        .get(`${API_URL}/api/refresh`, {
          withCredentials: true
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          return $api.request(originalRequest);
        })
        .catch(() => {
          removeAccessToken();
          if (typeof window !== 'undefined') {
            history.push('/login');
          }
        });
      return result;
    }
    if (error.response.status === 400) {
      console.log(error.response.status);
    }
    return Promise.reject(error);
  }
);

export { $api };

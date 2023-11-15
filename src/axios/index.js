import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const timeout = 10000;

axios.defaults.baseURL = baseURL;
axios.defaults.timeout = timeout;

const instance = axios.create({ baseURL, timeout });

instance.interceptors.request.use(
  async (config) => {
    const controller = new AbortController();

    const token = localStorage.getItem('token');

    if (token) {
      const decoded = jwtDecode(token);
      const now = Math.floor(new Date().getTime() / 1000.0);

      if (decoded.exp < now) {
        controller.abort();
      }

      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return {
      ...config,
      signal: controller.signal,
    };
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { axios, instance };

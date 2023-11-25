import axios from 'axios';

import { router } from '../main';
import { validateToken } from '../tools';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const timeout = 10000;

axios.defaults.baseURL = baseURL;
axios.defaults.timeout = timeout;

const instance = axios.create({ baseURL, timeout });

instance.interceptors.request.use(
  async (config) => {
    const controller = new AbortController();

    const validToken = validateToken();

    if (!validToken) {
      controller.abort();
      router.navigate('/login');
    }

    const token = localStorage.getItem('token');

    config.headers['Authorization'] = `Bearer ${token}`;
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

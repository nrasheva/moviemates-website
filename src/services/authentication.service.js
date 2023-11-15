import { axios } from '../axios';

export const login = async (email, password) => {
  const { data } = await axios.post('/login', { email, password });
  return { token: data.token };
};

export const register = async (email, password) => {
  return await axios.post('/register', { email, password });
};

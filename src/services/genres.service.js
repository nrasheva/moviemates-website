import { axios } from '../axios';

export const getGenres = async () => {
  const { data } = await axios.get('/getGenres');
  return { genres: data };
};

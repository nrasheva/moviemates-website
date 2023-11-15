import { axios } from '../axios';

export const discoverMovies = async (genre) => {
  const { data } = await axios.get(`/discoverMovies?genre=${genre}`);
  return { movies: data };
};

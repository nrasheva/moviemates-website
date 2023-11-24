import { axios } from '../axios';

export const discoverMovies = async (genre) => {
  const { data } = await axios.get(`/discoverMovies?genre=${genre}&page=${1}`);
  return { movies: data };
};

export const getMovieById = async (id) => {
  const { data } = await axios.get(`/getMovie?id=${id}`);
  return { movie: data };
};

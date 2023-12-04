import { instance } from '../axios';

export const addMovie = async (movieId) => {
  await instance.post(`/watchlist?id=${movieId}`);
};

export const deleteMovie = async (movieId) => {
  await instance.delete(`/watchlist?id=${movieId}`);
};

export const getWatchlist = async () => {
  const { data } = await instance.get('/watchlist');
  return { watchlist: data };
};

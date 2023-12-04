import { axios } from '../axios';
import { validateJSON } from '../tools';

export const discoverMovies = async (genre) => {
  let genreIndex = -1;
  let page = 1;

  const pagination = await validateJSON(localStorage.getItem('pagination'));

  if (pagination) {
    genreIndex = pagination.findIndex((element) => element.genre === genre);
    page = genreIndex !== -1 ? pagination[genreIndex].page : page;
  }

  const { data } = await axios.get(`/discoverMovies?genre=${genre}&page=${page}`);

  if (pagination) {
    if (genreIndex !== -1) {
      // TMDB API page must be less than or equal to 500
      pagination[genreIndex].page = page < (data.total_pages && 500) ? page + 1 : 1;

      localStorage.setItem('pagination', JSON.stringify(pagination));
    } else {
      localStorage.setItem('pagination', JSON.stringify([...pagination, { genre, page: 1 }]));
    }
  } else {
    localStorage.setItem('pagination', JSON.stringify([{ genre, page: 1 }]));
  }

  return { movies: data.movies };
};

export const getMovie = async (id) => {
  const { data } = await axios.get(`/getMovie?id=${id}`);
  return { movie: data };
};

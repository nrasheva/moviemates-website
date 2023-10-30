import styles from './DiscoverMovies.module.css';
import { useEffect, useState } from 'react';
import { getGenres } from '../../services/genres.service';
import { useDispatch, useSelector } from 'react-redux';
import { setGenres } from '../../redux/reducers/genres';
import { setMovies } from '../../redux/reducers/movies';
import { discoverMovies } from '../../services/movies.service';

export const DiscoverMovies = () => {
  const [activeMovie, setActiveMovie] = useState({});

  const genres = useSelector((state) => state.genres.genres);
  const movies = useSelector((state) => state.movies.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { genres } = await getGenres();

        dispatch(setGenres(genres));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  const handleGenre = async (genreId) => {
    try {
      const { movies } = await discoverMovies(genreId);

      setActiveMovie(movies[0]);

      dispatch(setMovies(movies));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles['discover-movies']}>
      <div className={styles.genres}>
        {genres.map((genre) => (
          <button key={genre.id} onClick={() => handleGenre(genre.id)}>
            {genre.name}
          </button>
        ))}
      </div>
      {movies.length ? <h2>{activeMovie.title}</h2> : null}
      <div>
        {movies.map((movie, index) => (
          <button key={movie.id} onClick={() => setActiveMovie(movies[index])}>
            {movie.title}
          </button>
        ))}
      </div>
    </div>
  );
};

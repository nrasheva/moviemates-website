import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './InfiniteScroll.module.css';
import { setMovies } from '../../redux/reducers/movies';
import { discoverMovies } from '../../services/movies.service';
import { handleError } from '../../tools';
import { Movie } from '../Movie/Movie';

export const InfiniteScroll = () => {
  const [initialized, setInitialized] = useState(false);

  const { activeMovie, movies } = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!initialized && scrollContainerRef.current) {
      const activeMovieIndex = movies.findIndex((movie) => movie.id === activeMovie.id);

      const y = activeMovieIndex > 0 ? scrollContainerRef.current.offsetHeight * activeMovieIndex : 0;

      scrollContainerRef.current.scrollTo(0, y);
    }

    setInitialized(true);
  }, [activeMovie.id, initialized, movies]);

  useEffect(() => {
    const activeMovieIndex = movies.findIndex((movie) => movie.id === activeMovie.id);

    if (activeMovieIndex !== -1 && activeMovieIndex === movies.length - 6) {
      (async () => {
        try {
          const { movies: newMovies } = await discoverMovies();

          dispatch(setMovies([...movies, ...newMovies]));
        } catch (error) {
          handleError(error);
        }
      })();
    }
  }, [activeMovie.id, dispatch, movies]);

  return (
    <div className={styles['infinite-scroll']}>
      <div className={styles['scroll-container']} ref={scrollContainerRef}>
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

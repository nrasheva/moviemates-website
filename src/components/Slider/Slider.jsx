import { useDispatch, useSelector } from 'react-redux';

import styles from './Slider.module.css';
import { setActiveMovie } from '../../redux/reducers/movies';

export const Slider = () => {
  const { activeMovie, movies } = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  return (
    <div className={styles['slider-container']}>
      <div className={styles.slider}>
        {movies.map((movie) => (
          <div
            className={`${styles.slide} ${activeMovie && activeMovie.id === movie.id ? styles.active : ''}`}
            key={movie.id}
            onClick={() => dispatch(setActiveMovie(movie))}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} style={{ maxWidth: '100%' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

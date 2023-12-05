import { useDispatch, useSelector } from 'react-redux';

import styles from './Genres.module.css';
import { setActiveGenre } from '../../redux/reducers/genres';
import { setActiveMovie } from '../../redux/reducers/movies';

export const Genres = () => {
  const { activeGenre, genres } = useSelector((state) => state.genres);

  const dispatch = useDispatch();

  return (
    <ul className={styles.genres}>
      {genres.map((genre) => (
        <li
          className={`font-s white ${activeGenre && activeGenre === genre.id ? styles.active : ''}`}
          key={genre.id}
          onClick={() => {
            dispatch(setActiveGenre(genre.id));
            dispatch(setActiveMovie({}));
          }}>
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

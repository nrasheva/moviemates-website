import { useDispatch, useSelector } from 'react-redux';

import styles from './Genres.module.css';
import { setActiveGenre } from '../../redux/reducers/genres';

export const Genres = () => {
  const { activeGenre, genres } = useSelector((state) => state.genres);

  const dispatch = useDispatch();

  return (
    <ul className={styles.genres}>
      {genres.map((genre) => (
        <li
          className={`font-s white ${activeGenre && activeGenre === genre.id ? styles.active : ''}`}
          key={genre.id}
          onClick={() => dispatch(setActiveGenre(genre.id))}>
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

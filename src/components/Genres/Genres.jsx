import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Genres.module.css';
import { setGenres } from '../../redux/reducers/genres';
import { getGenres } from '../../services/genres.service';
import { handleError } from '../../tools';

export const Genres = ({ handleActiveGenre }) => {
  const genres = useSelector((state) => state.genres.genres);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { genres } = await getGenres();

        dispatch(setGenres(genres));

        handleActiveGenre(genres[0].id);
      } catch (error) {
        handleError(error);
      }
    })();
  }, [dispatch, handleActiveGenre]);

  return (
    <ul className={styles.genres}>
      {genres.map((genre) => (
        <li className='font-m white' key={genre.id} onClick={() => handleActiveGenre(genre.id)}>
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

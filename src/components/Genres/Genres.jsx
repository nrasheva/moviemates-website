import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Genres.module.css';
import { setGenres } from '../../redux/reducers/genres';
import { getGenres } from '../../services/genres.service';

export const Genres = (props) => {
  const genres = useSelector((state) => state.genres.genres);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { genres } = await getGenres();

        dispatch(setGenres(genres));
        props.setActiveGenre(genres[0].id);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch, props]);

  return (
    <ul onClick={() => props.setActiveGenre(genres.id)} className={styles.genres}>
      {genres.map((genre) => (
        <li className='font-m white' key={genre.id}>
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

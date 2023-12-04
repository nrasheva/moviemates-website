import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Profile.module.css';
import { Content } from '../../components/Content/Content';
import { setLoading } from '../../redux/reducers/shared';
import { setMovies } from '../../redux/reducers/watchlist';
import { getMovie } from '../../services/movies.service';
import { handleError, handleWatchlist } from '../../tools';

export const ProfilePage = () => {
  const { movies, watchlist } = useSelector((state) => state.watchlist);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        await handleWatchlist();
      } catch (error) {
        handleError(error);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        // Extract IDs from watchlist that do not exist in movies to avoid redundant requests
        const noMovies = watchlist.filter((id) => !movies.some((movie) => movie.id === id));

        if (noMovies.length) {
          dispatch(setLoading(true));

          const updatedMovies = [...movies];

          for (let i = 0; i < noMovies.length; i++) {
            const { movie } = await getMovie(noMovies[i]);

            updatedMovies.push(movie);
          }

          dispatch(setLoading(false));
          dispatch(setMovies(updatedMovies));
        }
      } catch (error) {
        handleError(error);
      }
    })();
  }, [dispatch, movies, watchlist]);

  return (
    <main>
      <div className='hero' style={{ flexDirection: 'column' }}>
        <div className='hero-row'>
          <Content
            buttons={null}
            heading='Watchlist'
            subHeading='Lorem Ipsum is simply dummy text of the typesetting industry'
          />
        </div>
        <div className='hero-row'>
          <div className={styles['watchlist-container']}>
            {movies.map((movie) => (
              <img key={movie.id} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

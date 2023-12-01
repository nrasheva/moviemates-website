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
    <main className='main'>
      <div className='hero'>
        <div className='hero-column'>
          <Content buttons={<></>} heading='@nadya' subHeading='' />
        </div>
        <div className='hero-column'>
          {movies.map((movie, i) => (
            <div key={movie.id}>{`(${i}) ${movie.title}`}</div>
          ))}
        </div>
      </div>
    </main>
  );
};

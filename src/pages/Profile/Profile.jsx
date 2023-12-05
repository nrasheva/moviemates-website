import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Profile.module.css';
import { Button } from '../../components/Button/Button';
import { Content } from '../../components/Content/Content';
import { setLoading } from '../../redux/reducers/shared';
import { setMovies, setWatchlist } from '../../redux/reducers/watchlist';
import { getMovie } from '../../services/movies.service';
import { deleteMovie } from '../../services/watchlist.service';
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
        const moviesWithoutDetails = watchlist.filter((id) => !movies.some((movie) => movie.id === id));

        if (moviesWithoutDetails.length) {
          dispatch(setLoading(true));

          const updatedMovies = [...movies];

          for (let i = 0; i < moviesWithoutDetails.length; i++) {
            const { movie } = await getMovie(moviesWithoutDetails[i]);

            updatedMovies.push(movie);
          }

          dispatch(setLoading(false));
          dispatch(setMovies(updatedMovies));
        } else if (movies.length !== watchlist.length) {
          // Filter the movies that were removed from the watchlist
          const filteredMovies = watchlist.length ? movies.filter((movie) => !watchlist.includes(movie.id)) : [];

          dispatch(setMovies(filteredMovies));
        }
      } catch (error) {
        handleError(error);
      }
    })();
  }, [dispatch, movies, watchlist]);

  const handleDeleteMovie = async (movie) => {
    try {
      await deleteMovie(movie.id);

      const updatedWatchlist = watchlist.filter((m) => m !== movie.id);

      dispatch(setWatchlist(updatedWatchlist));
    } catch (error) {
      handleError(error);
    }
  };

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
              <div className={styles.movie} key={movie.id}>
                <span className={styles.overlay}>
                  <Button
                    bounce={false}
                    icon='fas fa-heart'
                    onClick={() => handleDeleteMovie(movie)}
                    text=''
                    type='square'
                  />
                </span>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

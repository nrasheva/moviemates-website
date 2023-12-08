import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

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
        if (movies.length !== watchlist.length) {
          // 1. Filter the movies that were removed from the watchlist
          const removed = movies.filter((movie) => watchlist.includes(movie.id));
          // 2. Extract the IDs from the watchlist that do not exist in movies to avoid redundant requests
          const noDetails = watchlist.filter((id) => !removed.some((movie) => movie.id === id));

          const updatedMovies = [...removed];

          if (noDetails.length) {
            dispatch(setLoading(true));

            for (let i = 0; i < noDetails.length; i++) {
              const { movie } = await getMovie(noDetails[i]);

              updatedMovies.push(movie);
            }
          }

          dispatch(setLoading(false));
          dispatch(setMovies(updatedMovies));
        }
      } catch (error) {
        handleError(error);
      }
    })();
  }, [dispatch, movies, watchlist]);

  const handleDeleteMovie = async (e, movie) => {
    e.stopPropagation();

    dispatch(setLoading(true));

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
              <div className={styles.movie} key={movie.id} onClick={() => navigate(`/details/${movie.id}`)}>
                <span className={styles.overlay}>
                  <Button
                    bounce={false}
                    icon='fas fa-heart'
                    onClick={(е) => handleDeleteMovie(е, movie)}
                    text=''
                    type='square'
                  />
                </span>
                <img alt={movie.title} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

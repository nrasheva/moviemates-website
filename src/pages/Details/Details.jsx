import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './Details.module.css';
import noise from '../../assets/noise.jpg';
import { Button } from '../../components/Button/Button';
import { Content } from '../../components/Content/Content';
import { Discussions } from '../../components/Discussions/Discussions';
import { setLoading } from '../../redux/reducers/shared';
import { getMovie } from '../../services/movies.service';
import { addMovie, deleteMovie } from '../../services/watchlist.service';
import { formatDate, handleWatchlist } from '../../tools';

export const DetailsPage = () => {
  const [movie, setMovie] = useState({});

  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const watchlist = useSelector((state) => state.watchlist.watchlist);

  const dispatch = useDispatch();

  const { movieId } = useParams();

  const discussionsRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';

    window.scrollTo(0, 0);

    document.documentElement.style.scrollBehavior = 'smooth';

    (async () => {
      try {
        if (isAuthenticated) {
          await handleWatchlist();
        }

        const { movie } = await getMovie(movieId);

        dispatch(setLoading(false));

        setMovie(movie);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch, isAuthenticated, movieId]);

  const details = useMemo(() => {
    let fields = [];

    if (movie.release_date && movie.runtime && movie.vote_average) {
      fields = [
        { icon: 'fa-star', text: `${movie.vote_average.toFixed(1)} / 10` },
        { icon: 'fa-calendar', text: formatDate(movie.release_date) },
        { icon: 'fa-clock', text: `${movie.runtime} min` },
      ];
    }

    return fields;
  }, [movie.release_date, movie.runtime, movie.vote_average]);

  const favourite = useMemo(() => {
    return !!watchlist.find((movie) => movie === Number(movieId));
  }, [movieId, watchlist]);

  const toggleWatchlist = async () => {
    try {
      if (favourite) {
        await deleteMovie(movieId);
      } else {
        await addMovie(movieId);
      }

      await handleWatchlist();
    } catch (error) {
      console.log(error);
    }
  };

  const Buttons = () => {
    return (
      <>
        <Button icon='' onClick={() => discussionsRef.current.scrollIntoView()} text='Discussions' type='filled' />
        {isAuthenticated && (
          <Button icon={favourite ? 'fas fa-heart' : 'far fa-heart'} onClick={toggleWatchlist} text='' type='square' />
        )}
      </>
    );
  };

  return (
    <main className='main'>
      <div
        className='hero'
        style={{
          backgroundImage: `url(${
            movie.backdrop_path ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` : noise
          })`,
        }}>
        <div className='hero-column'>
          <Content buttons={<Buttons />} heading={movie.title} subHeading={movie.overview}>
            <div className={styles.details}>
              {details.map((detail) => (
                <span key={detail.icon}>
                  <FontAwesomeIcon icon={`fa-regular ${detail.icon}`} />
                  <p className='font-s'>{detail.text}</p>
                </span>
              ))}
            </div>
          </Content>
        </div>
        <div className='hero-column' />
      </div>
      <Discussions movieId={movieId} ref={discussionsRef} />
    </main>
  );
};

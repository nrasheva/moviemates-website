import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './Details.module.css';
import noise from '../../assets/noise.jpg';
import { Button } from '../../components/Button/Button';
import { Content } from '../../components/Content/Content';
import { Discussions } from '../../components/Discussions/Discussions';
import { setLoading } from '../../redux/reducers/shared';
import { getMovie } from '../../services/movies.service';
import { addMovie, deleteMovie } from '../../services/watchlist.service';
import { formatDate, handleError, handleWatchlist } from '../../tools';

export const DetailsPage = () => {
  const [bounce, setBounce] = useState(false);
  const [movie, setMovie] = useState({});

  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const watchlist = useSelector((state) => state.watchlist.watchlist);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { movieId } = useParams();

  const discussionsRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';

    window.scrollTo(0, 0);

    document.documentElement.style.scrollBehavior = 'smooth';

    if (movieId !== 'undefined') {
      (async () => {
        try {
          if (isAuthenticated) {
            await handleWatchlist();
          }
          const { movie } = await getMovie(movieId);
          dispatch(setLoading(false));
          setMovie(movie);
        } catch (error) {
          handleError(error);
        }
      })();
    } else {
      navigate('/discover');
    }
  }, [dispatch, isAuthenticated, movieId, navigate]);

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

  const handleScrollIntoView = () => {
    const y = discussionsRef.current.offsetTop;

    window.scrollTo(0, y - 60); // Offset the height of the Navigation (60px)
  };

  const favourite = useMemo(() => {
    return !!watchlist.find((movie) => movie === Number(movieId));
  }, [movieId, watchlist]);

  const toggleWatchlist = async () => {
    try {
      if (favourite) {
        await deleteMovie(movieId);
      } else {
        await addMovie(movieId);

        setBounce(true);

        setTimeout(() => {
          setBounce(false);
        }, 1000);
      }

      await handleWatchlist();
    } catch (error) {
      handleError(error);
    }
  };

  const Buttons = () => {
    return (
      <>
        <Button icon='' onClick={handleScrollIntoView} text='Discussions' type='filled' />
        {isAuthenticated && (
          <Button
            bounce={bounce}
            icon={favourite ? 'fas fa-heart' : 'far fa-heart'}
            onClick={toggleWatchlist}
            text=''
            type='square'
          />
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
          {Object.keys(movie).length > 0 && (
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
          )}
        </div>
        <div className='hero-column' />
      </div>
      {movieId !== 'undefined' && <Discussions movieId={movieId} ref={discussionsRef} />}
    </main>
  );
};

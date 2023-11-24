import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './Details.module.css';
import noise from '../../assets/noise.jpg';
import { Button } from '../../components/Button/Button';
import { Content } from '../../components/Content/Content';
import { getMovieById } from '../../services/movies.service';
import { formatDate } from '../../tools';

export const DetailsPage = () => {
  const [movie, setMovie] = useState({});

  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);

  const { movieId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { movie } = await getMovieById(movieId);

        setMovie(movie);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [movieId]);

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

  const Buttons = () => {
    return (
      <>
        <Button text='Discussions' type='filled' onClick={() => {}} />
        {isAuthenticated && <Button text='' type='square' onClick={() => {}} />}
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
    </main>
  );
};

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import noise from '../../assets/noise.jpg';
import { Button } from '../../components/Button/Button';
import { Content } from '../../components/Content/Content';
import { getMovieById } from '../../services/movies.service';

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

  const Buttons = () => {
    return (
      <>
        <Button text='Discussions' type='filled' onClick={() => {}} />
        {isAuthenticated && <Button text='Add to watchlist' type='outlined' onClick={() => {}} />}
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
          <Content buttons={<Buttons />} heading={movie.title} subHeading={movie.overview} />
        </div>
        <div className='hero-column' />
      </div>
    </main>
  );
};

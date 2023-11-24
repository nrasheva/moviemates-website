import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Content } from '../../components/Content/Content';
import { getMovieById } from '../../services/movies.service';

export const DetailsPage = () => {
  const [movie, setMovie] = useState({});

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

  return (
    <main className='main'>
      <div
        className='container hero'
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}>
        <div className='hero-column'>
          <Content button='Discussions' heading={movie.title} navigate='' subHeading={movie.overview} />
        </div>
        <div className='hero-column' />
      </div>
    </main>
  );
};

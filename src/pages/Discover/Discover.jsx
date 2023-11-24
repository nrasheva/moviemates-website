import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Content } from '../../components/Content/Content';
import { Genres } from '../../components/Genres/Genres';
import { setMovies } from '../../redux/reducers/movies';
import { discoverMovies } from '../../services/movies.service';

export const DiscoverPage = () => {
  const [activeGenre, setActiveGenre] = useState(-1);
  const [activeMovie, setActiveMovie] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (activeGenre !== -1) {
      (async () => {
        try {
          const { movies } = await discoverMovies(activeGenre);

          dispatch(setMovies(movies));
          setActiveMovie(movies[0]);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [activeGenre, dispatch]);

  return (
    <main className='main'>
      <div
        className='container hero'
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${activeMovie.backdrop_path})` }}>
        <div className='hero-column'>
          <Genres setActiveGenre={setActiveGenre} />
          <Content
            button='Details'
            heading={activeMovie.title}
            navigate={`/details/${activeMovie.id}`}
            subHeading='Find the best option with us and share your opinion'
          />
        </div>
        <div className='hero-column' />
      </div>
    </main>
  );
};

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/Button/Button';
import { Content } from '../../components/Content/Content';
import { Genres } from '../../components/Genres/Genres';
import { setMovies } from '../../redux/reducers/movies';
import { discoverMovies } from '../../services/movies.service';

export const DiscoverPage = () => {
  const [activeGenre, setActiveGenre] = useState(-1);
  const [activeMovie, setActiveMovie] = useState({});

  const dispatch = useDispatch();

  const navigate = useNavigate();

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

  const Buttons = () => {
    return (
      <>
        <Button text='Details' type='filled' onClick={() => navigate(`/details/${activeMovie.id}`)} />
        <Button text='More movies' type='outlined' onClick={() => navigate(`/details/${activeMovie.id}`)} />
      </>
    );
  };

  return (
    <main className='main'>
      <div
        className='container hero'
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${activeMovie.backdrop_path})` }}>
        <div className='hero-column'>
          <Genres setActiveGenre={setActiveGenre} />
          <Content
            buttons={<Buttons />}
            heading={activeMovie.title}
            subHeading='Find the best option with us and share your opinion'
          />
        </div>
        <div className='hero-column' />
      </div>
    </main>
  );
};

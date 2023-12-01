import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Discover.module.css';
import noise from '../../assets/noise.jpg';
import { Button } from '../../components/Button/Button';
import { Content } from '../../components/Content/Content';
import { Genres } from '../../components/Genres/Genres';
import { Slider } from '../../components/Slider/Slider';
import { setMovies } from '../../redux/reducers/movies';
import { setLoading } from '../../redux/reducers/shared';
import { discoverMovies } from '../../services/movies.service';
import { handleError } from '../../tools';

export const DiscoverPage = () => {
  const [activeGenre, setActiveGenre] = useState(-1);
  const [activeMovie, setActiveMovie] = useState({});
  const [desktop, setDesktop] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const handleDevice = () => {
      const { matches: isDesktop } = window.matchMedia('(min-width: 1200px)');

      if (desktop !== isDesktop) {
        setDesktop(isDesktop);
      }
    };

    window.addEventListener('resize', handleDevice);

    return () => {
      window.removeEventListener('resize', handleDevice);
    };
  }, [desktop]);

  const handleDiscoverMovies = useCallback(async () => {
    dispatch(setLoading(true));

    try {
      const { movies } = await discoverMovies(activeGenre);

      dispatch(setLoading(false));
      dispatch(setMovies(movies));

      setActiveMovie(movies[0]);
    } catch (error) {
      handleError(error);
    }
  }, [activeGenre, dispatch, setActiveMovie]);

  useEffect(() => {
    if (activeGenre !== -1) {
      handleDiscoverMovies();
    }
  }, [activeGenre, handleDiscoverMovies]);

  const Buttons = () => {
    return (
      <>
        <Button icon='' onClick={() => navigate(`/details/${activeMovie.id}`)} text='Details' type='filled' />
        <Button icon='' onClick={() => handleDiscoverMovies()} text='Refresh list' type='outlined' />
      </>
    );
  };

  const handleActiveGenre = useCallback((genre) => {
    setActiveGenre(genre);
  }, []);

  return (
    <main className='main'>
      <div
        className='hero'
        style={{
          backgroundImage: `url(${
            activeMovie.backdrop_path ? `https://image.tmdb.org/t/p/original/${activeMovie.backdrop_path}` : noise
          })`,
        }}>
        <div className='hero-column'>
          <Genres handleActiveGenre={handleActiveGenre} />
          {Object.keys(activeMovie).length > 0 && (
            <div className={styles['scroll-container']}>
              <Content buttons={<Buttons />} heading={activeMovie.title} subHeading={activeMovie.overview} />
            </div>
          )}
        </div>
        <div className='hero-column'>
          <Slider />
        </div>
      </div>
    </main>
  );
};

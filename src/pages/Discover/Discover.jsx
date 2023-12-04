import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import noise from '../../assets/noise.jpg';
import { Button } from '../../components/Button/Button';
import { Content } from '../../components/Content/Content';
import { Genres } from '../../components/Genres/Genres';
import { InfiniteScroll } from '../../components/InfiniteScroll/InfiniteScroll';
import { Slider } from '../../components/Slider/Slider';
import { setActiveGenre, setGenres } from '../../redux/reducers/genres';
import { setActiveMovie, setMovies } from '../../redux/reducers/movies';
import { setLoading } from '../../redux/reducers/shared';
import { getGenres } from '../../services/genres.service';
import { discoverMovies } from '../../services/movies.service';
import { handleError } from '../../tools';

export const DiscoverPage = () => {
  const [desktop, setDesktop] = useState(false);

  const { activeGenre, genres } = useSelector((state) => state.genres);
  const activeMovie = useSelector((state) => state.movies.activeMovie);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const handleDevice = () => {
      const { matches: isDesktop } = window.matchMedia('(min-width: 1200px)');

      setDesktop(isDesktop);
    };

    handleDevice();

    window.addEventListener('resize', handleDevice);

    return () => {
      window.removeEventListener('resize', handleDevice);
    };
  }, [desktop]);

  useEffect(() => {
    if (genres.length === 0) {
      (async () => {
        try {
          const { genres } = await getGenres();

          dispatch(setActiveGenre(genres[0].id));
          dispatch(setGenres(genres));
        } catch (error) {
          handleError(error);
        }
      })();
    }
  }, [dispatch, genres.length]);

  const handleDiscoverMovies = useCallback(async () => {
    dispatch(setLoading(true));

    try {
      const { movies } = await discoverMovies(activeGenre);

      dispatch(setActiveMovie(movies[0]));
      dispatch(setLoading(false));
      dispatch(setMovies(movies));
    } catch (error) {
      handleError(error);
    }
  }, [activeGenre, dispatch]);

  useEffect(() => {
    if (activeGenre !== -1 && Object.keys(activeMovie).length === 0) {
      handleDiscoverMovies();
    } else {
      dispatch(setLoading(false));
    }
  }, [activeGenre, activeMovie, dispatch, handleDiscoverMovies]);

  const Buttons = () => {
    return (
      <>
        <Button icon='' onClick={() => navigate(`/details/${activeMovie.id}`)} text='Details' type='filled' />
        <Button icon='' onClick={() => handleDiscoverMovies()} text='Refresh list' type='outlined' />
      </>
    );
  };

  return (
    <main>
      {desktop ? (
        <div
          className='hero'
          style={{
            backgroundImage: `url(${
              activeMovie.backdrop_path ? `https://image.tmdb.org/t/p/original/${activeMovie.backdrop_path}` : noise
            })`,
          }}>
          <div className='hero-column'>
            <Genres />
            {Object.keys(activeMovie).length > 0 && (
              <Content buttons={<Buttons />} heading={activeMovie.title} subHeading={activeMovie.overview} />
            )}
          </div>
          <div className='hero-column'>
            <Slider />
          </div>
        </div>
      ) : (
        <InfiniteScroll />
      )}
    </main>
  );
};

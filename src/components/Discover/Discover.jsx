import 'swiper/css';
import styles from './Discover.module.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { discoverMovies } from '../../services/movies.service';
import { getGenres } from '../../services/genres.service';
import { setGenres } from '../../redux/reducers/genres';
import { setMovies } from '../../redux/reducers/movies';
import { useNavigate } from 'react-router-dom';

export const Discover = () => {
  const [activeGenre, setActiveGenre] = useState(-1);
  const [activeMovie, setActiveMovie] = useState({});

  const genres = useSelector((state) => state.genres.genres);
  const movies = useSelector((state) => state.movies.movies);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { genres } = await getGenres();

        setActiveGenre(genres[0].id);

        dispatch(setGenres(genres));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (activeGenre !== -1) {
      (async () => {
        try {
          const { movies } = await discoverMovies(activeGenre);

          // Keep only the first sentence of the overview
          movies.forEach((movie) => (movie.overview = movie.overview.split('.')[0]));

          setActiveMovie(movies[0]);

          dispatch(setMovies(movies));
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [activeGenre, dispatch]);

  const handleGenreName = (genreId) => {
    const genre = genres.find((genre) => genre.id === genreId);
    return genre.name;
  };

  // Format the data
  const dateString = activeMovie.release_date;

  const date = new Date(dateString);

  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  const formattedDate = date.toLocaleDateString('en-GB', options);

  const handleViewDiscussion = () => {
    const movieId = activeMovie.id;
    try {
      navigate(`/comments/${movieId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={styles['discover-movies']}
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${activeMovie.backdrop_path})` }}
    >
      <div className={styles['discover-movies-container']}>
        <ul className={styles['genres-selector']}>
          {genres.slice(0, 5).map((genre) => (
            <li
              className='font-m white'
              key={genre.id}
              onClick={() => setActiveGenre(genre.id)}
              style={{ opacity: activeGenre === genre.id ? 1 : 0.5 }}
            >
              {genre.name}
            </li>
          ))}
        </ul>
        {movies.length ? (
          <>
            <div className={styles['discover-movies-content']}>
              <h1 className='white'>{activeMovie.title}</h1>
              <p className='font-m white'>{`${activeMovie.overview}.`}</p>
              <div className={styles['movie-genres']}>
                {activeMovie.genre_ids &&
                  activeMovie.genre_ids.map((id) => (
                    <p className='font-s white' key={id}>
                      {handleGenreName(id)}
                    </p>
                  ))}
              </div>
              <div className={styles['movie-more-info']}>
                <p className='font-s white'>{`${activeMovie.vote_average}/10`}</p>
                <p className='font-s white'>{formattedDate}</p>
              </div>
              <Button text='View discussion' type='filled' onClick={handleViewDiscussion} />
            </div>
            <div className={styles['discover-movies-content']}>
              <Swiper className={styles.swiper} slidesPerView={3} spaceBetween={20}>
                {movies.map((movie) => (
                  <SwiperSlide
                    className={`${styles.slide} ${activeMovie.id === movie.id ? styles.active : ''}`}
                    key={movie.id}
                    onClick={() => setActiveMovie(movie)}
                  >
                    <span
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w300/${movie.poster_path})`,
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

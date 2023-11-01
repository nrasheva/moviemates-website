import styles from './DiscoverMovies.module.css';
import { useEffect, useState } from 'react';
import { getGenres } from '../../services/genres.service';
import { useDispatch, useSelector } from 'react-redux';
import { setGenres } from '../../redux/reducers/genres';
import { setMovies } from '../../redux/reducers/movies';
import { discoverMovies } from '../../services/movies.service';
import { Button } from '../Button/Button';

export const DiscoverMovies = () => {
  const [activeGenre, setActiveGenre] = useState(-1);
  const [activeMovie, setActiveMovie] = useState({});

  const genres = useSelector((state) => state.genres.genres);
  const movies = useSelector((state) => state.movies.movies);

  const dispatch = useDispatch();

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
          <div className={styles['discover-movies-content']}>
            <h2 className='white'>{activeMovie.title}</h2>
            <p className='font-m white'>{activeMovie.overview}</p>
            <div className={styles['movie-genres']}>
              {activeMovie.genre_ids &&
                activeMovie.genre_ids.map((id) => (
                  <p className='font-m white' key={id}>
                    {handleGenreName(id)}
                  </p>
                ))}
            </div>
            <Button text='View discussion' />
          </div>
        ) : null}
        {/* <div>
          {movies.map((movie, index) => (
            <button key={movie.id} onClick={() => setActiveMovie(movies[index])}>
              {movie.title}
            </button>
          ))}
        </div> */}
      </div>
    </div>
  );
};

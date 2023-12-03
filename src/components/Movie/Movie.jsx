import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Movie.module.css';
import noise from '../../assets/noise.jpg';
import { Content } from '../../components/Content/Content';
import { setActiveMovie } from '../../redux/reducers/movies';
import { Button } from '../Button/Button';

export const Movie = (props) => {
  const [opacity, setOpacity] = useState(0);

  const activeMovie = useSelector((state) => state.movies.activeMovie);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const movieRef = useRef(null);

  useEffect(() => {
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          dispatch(setActiveMovie(props.movie));
        }

        setOpacity(entry.isIntersecting ? 1 : 0);
      });
    };

    const options = {
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(callback, options);

    const movie = movieRef.current;

    if (movie) {
      observer.observe(movie);
    }

    return () => {
      if (movie) {
        observer.unobserve(movie);
      }
    };
  }, [dispatch, props.movie]);

  const Buttons = () => {
    return (
      <>
        <Button icon='' onClick={() => navigate(`/details/${activeMovie.id}`)} text='Details' type='filled' />
        <Button icon='' onClick={() => {}} text='Genres' type='outlined' />
      </>
    );
  };

  return (
    <div
      className={`hero ${styles.movie}`}
      key={props.movie.id}
      ref={movieRef}
      style={{
        backgroundImage: `url(${
          props.movie.backdrop_path ? `https://image.tmdb.org/t/p/original/${props.movie.backdrop_path}` : noise
        })`,
      }}>
      <div className='hero-column' style={{ opacity, transition: 'opacity 0.1s ease-in-out' }}>
        {/* <Genres handleActiveGenre={handleActiveGenre} /> */}
        <Content buttons={<Buttons />} heading={props.movie.title} subHeading={props.movie.overview} />
      </div>
      <div className='hero-column' />
    </div>
  );
};

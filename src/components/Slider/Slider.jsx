import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Slider.module.css';
import { setActiveMovie } from '../../redux/reducers/movies';

export const Slider = () => {
  const [dragging, setDragging] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [start, setStart] = useState(0);

  const { activeMovie, movies } = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  const sliderRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = x - start;

        sliderRef.current.scrollLeft = scroll - walk;
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, scroll, start]);

  const handleMouseDown = (e) => {
    e.preventDefault();

    setDragging(true);
    setScroll(sliderRef.current.scrollLeft);
    setStart(e.pageX - sliderRef.current.offsetLeft);
  };

  return (
    <div className={styles['slider-container']}>
      <div className={styles.slider} onMouseDown={handleMouseDown} ref={sliderRef}>
        {movies.map((movie) => (
          <div
            className={`${styles.slide} ${activeMovie && activeMovie.id === movie.id ? styles.active : ''}`}
            key={movie.id}
            onClick={() => dispatch(setActiveMovie(movie))}>
            <img
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
              style={{ maxWidth: '100%' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

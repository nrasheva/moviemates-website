import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './InfiniteScroll.module.css';
import noise from '../../assets/noise.jpg';
import { Content } from '../../components/Content/Content';
import { Button } from '../Button/Button';

export const InfiniteScroll = () => {
  const { activeMovie, movies } = useSelector((state) => state.movies);

  const navigate = useNavigate();

  const Buttons = () => {
    return <Button icon='' onClick={() => navigate(`/details/${activeMovie.id}`)} text='Details' type='filled' />;
  };

  return (
    <div className={styles['infinite-scroll']}>
      <div className={styles['scroll-container']}>
        {movies.map((movie) => (
          <div
            className={`hero ${styles.movie}`}
            key={movie.id}
            style={{
              backgroundImage: `url(${
                movie.backdrop_path ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` : noise
              })`,
            }}>
            <div className='hero-column'>
              {/* <Genres handleActiveGenre={handleActiveGenre} /> */}
              <Content buttons={<Buttons />} heading={movie.title} subHeading={movie.overview} />
            </div>
            <div className='hero-column' />
          </div>
        ))}
      </div>
    </div>
  );
};

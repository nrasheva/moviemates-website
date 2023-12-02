import { useSelector } from 'react-redux';

import styles from './InfiniteScroll.module.css';
import noise from '../../assets/noise.jpg';
import { Content } from '../../components/Content/Content';

export const InfiniteScroll = () => {
  const movies = useSelector((state) => state.movies.movies);

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
              <Content buttons={<></>} heading={movie.title} subHeading={movie.overview} />
            </div>
            <div className='hero-column' />
          </div>
        ))}
      </div>
    </div>
  );
};

import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a className='font-s white' href='mailto:nadezhda.rasheva96@gmail.com'>
        &copy; {new Date().getFullYear()} Nadezhda Rasheva
      </a>
      <p className='font-s white'>
        Movie data courtesy of{' '}
        <a className='link' href='https://www.themoviedb.org' target='_blank'>
          TMDB
        </a>
      </p>
    </footer>
  );
};

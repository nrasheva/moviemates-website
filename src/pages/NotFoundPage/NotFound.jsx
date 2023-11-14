import styles from './NotFound.module.css';

export const NotFoundPage = () => {
  return (
    <div className={styles['not-found']}>
      <p> 404 - Life is like a box of chocolates, but this page seems to be missing from the box.</p>
    </div>
  );
};

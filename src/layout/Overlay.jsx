import styles from './Overlay.module.css';
import { Loader } from '../components/Loader/Loader';

export const Overlay = () => {
  return (
    <div className={styles.overlay}>
      <Loader />
    </div>
  );
};

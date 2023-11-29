import { useSelector } from 'react-redux';

import styles from './Overlay.module.css';
import { Loader } from '../components/Loader/Loader';

export const Overlay = () => {
  const loading = useSelector((state) => state.shared.loading);

  return loading ? (
    <div className={styles.overlay}>
      <Loader />
    </div>
  ) : (
    <></>
  );
};

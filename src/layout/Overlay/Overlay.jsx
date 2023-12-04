import { useSelector } from 'react-redux';

import styles from './Overlay.module.css';
import { Loader } from '../../components/Loader/Loader';

export const Overlay = () => {
  const visible = useSelector((state) => state.shared.overlay);

  return (
    visible && (
      <div className={styles.overlay}>
        <Loader />
      </div>
    )
  );
};

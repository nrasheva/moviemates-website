import { useNavigate } from 'react-router-dom';

import styles from './Home.module.css';
import { Button } from '../../components/Button/Button';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleDiscoverClick = async () => {
    navigate('/discover');
  };

  return (
    <div className={styles.home}>
      <div className={styles['home-welcome']}>
        <h2>Wander what movie to watch next?</h2>
        <p>Find the best option with us and share your opinion</p>
        <Button text='Discover' type='filled' onClick={handleDiscoverClick} />
      </div>
    </div>
  );
};

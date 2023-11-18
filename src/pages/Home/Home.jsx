import { useNavigate } from 'react-router-dom';

import styles from './Home.module.css';
import { Button } from '../../components/Button/Button';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleDiscoverClick = async () => {
    navigate('/discover');
  };

  return (
    <div className={`${styles.home} container`}>
      <div className='content'>
        <span>
          <h1>What to watch next?</h1>
          <p>Find the best option with us and share your opinion</p>
        </span>
        <Button text='Discover' type='filled' onClick={handleDiscoverClick} />
      </div>
    </div>
  );
};

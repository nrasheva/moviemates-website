import { useNavigate } from 'react-router-dom';

import styles from './NotFound.module.css';
import { Button } from '../../components/Button/Button';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleHomeClick = async () => {
    navigate('/');
  };

  return (
    <div className={`${styles.error} container`}>
      <div className='content font-m'>
        <span>
          <h1>Page not found</h1>
          <p>"Life is like a box of chocolates, but this page seems to be missing from the box"</p>
        </span>
        <Button type='filled' text='Home' onClick={handleHomeClick} />
      </div>
    </div>
  );
};

import { useNavigate } from 'react-router-dom';

import styles from './Content.module.css';
import { Button } from '../../components/Button/Button';

export const Content = (props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.content}>
      <h1 className='white'>{props.heading}</h1>
      <p className='font-m white'>{props.subHeading}</p>
      <Button text={props.button} type='filled' onClick={() => navigate(props.navigate)} />
    </div>
  );
};

import { useEffect, useState } from 'react';

import styles from './Content.module.css';

export const Content = (props) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setInitialized(true);
  }, []);

  return (
    <div className={`${styles.content} ${initialized ? styles.animated : ''}`}>
      <h1 className='white'>{props.heading}</h1>
      <p className='ellipsis font-m white'>{props.subHeading}</p>
      {props.children}
      {props.buttons && <div className={styles['button-container']}>{props.buttons}</div>}
    </div>
  );
};

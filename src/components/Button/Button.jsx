import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Button.module.css';

export const Button = (props) => {
  if (props.type === 'square') {
    return (
      <button className={styles.square} onClick={props.onClick}>
        <FontAwesomeIcon icon={props.icon} />
      </button>
    );
  }

  return (
    <button className={styles[props.type]} onClick={props.onClick}>
      <p className='font-m semi-bold'>{props.text}</p>
    </button>
  );
};

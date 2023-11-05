import styles from './Button.module.css';

export const Button = (props) => {
  return (
    <button className={styles[props.type]} onClick={props.onClick}>
      <p className='font-m semi-bold'>{props.text}</p>
    </button>
  );
};

import styles from './Button.module.css';

export const Button = (props) => {
  return (
    <button className={styles.filled}>
      <p className='font-m black semi-bold'>{props.text}</p>
    </button>
  );
};

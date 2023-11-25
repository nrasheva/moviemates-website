import styles from './Content.module.css';

export const Content = (props) => {
  return (
    <div className={styles.content}>
      <h1 className='white'>{props.heading}</h1>
      <p className='ellipsis font-m white'>{props.subHeading}</p>
      {props.children}
      <div className={styles['button-container']}>{props.buttons}</div>
    </div>
  );
};

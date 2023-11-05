import styles from './Input.module.css';

export const Input = (props) => {
  return (
    <input
      autoComplete={props.autoComplete}
      className={styles.input}
      onChange={(e) => props.onChange(e.target.value)}
      onKeyDown={(e) => props.type !== 'text' && e.code === 'Space' && e.preventDefault()}
      placeholder={props.placeholder}
      type={props.type}
      value={props.value}
    />
  );
};

import { useMemo } from 'react';

import styles from './Comment.module.css';
import { decodeToken, formatTimestamp } from '../../tools';
import { Button } from '../Button/Button';

export const Comment = (props) => {
  const owner = useMemo(() => {
    const decodedToken = decodeToken();

    return decodedToken && decodedToken.email === props.comment.author.email;
  }, [props.comment.author.email]);

  return (
    <div className={styles.comment}>
      <p className='font-m semi-bold white'>@{props.comment.author.email.split('@')[0]}</p>
      <div className={styles.created}>
        <p className='font-s'>{formatTimestamp(props.comment.created)}</p>
      </div>
      <p className='font-m white'>{props.comment.content}</p>
      {owner ? (
        <div className={styles.actions}>
          <Button icon='fa-solid fa-pen' onClick={() => {}} text='' type='round' />
          <Button icon='fa-solid fa-trash' onClick={() => {}} text='' type='round' />
        </div>
      ) : (
        <Button icon='' onClick={() => {}} text='Reply' type='empty' />
      )}
    </div>
  );
};

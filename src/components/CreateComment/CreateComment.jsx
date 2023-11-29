import { useState } from 'react';

import styles from './CreateComment.module.css';
import { createComment } from '../../services/comments.service';
import { Button } from '../Button/Button';

export const CreateComment = (props) => {
  const [content, setContent] = useState('');

  const handleCreateComment = async () => {
    try {
      await createComment({ content, movie: Number(props.movieId) });

      props.handleGetComments();

      setContent('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      autoComplete='off'
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
      }}>
      <textarea onChange={(e) => setContent(e.target.value)} placeholder='Enter comment' value={content} />
      <span className={styles['button-container']}>
        <Button icon='' onClick={handleCreateComment} text='Submit' type='filled' />
        <Button icon='' onClick={props.onCancel} text='Cancel' type='outlined' />
      </span>
    </form>
  );
};
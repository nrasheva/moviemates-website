import { useEffect, useState } from 'react';

import styles from './HandleComment.module.css';
import { createComment, editComment } from '../../services/comments.service';
import { handleError } from '../../tools';
import { Button } from '../Button/Button';

export const HandleComment = (props) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (props.comment && props.comment.content) {
      setContent(props.comment.content);
    } else {
      setContent('');
    }
  }, [props.comment]);

  const handleCreateComment = async () => {
    try {
      const data = { content, movie: Number(props.movieId) };

      if (props.parent) {
        data.parent = props.parent;
      }

      await createComment(data);

      props.handleGetComments();

      setContent('');
    } catch (error) {
      handleError(error);
    }
  };

  const handleEditComment = async () => {
    try {
      await editComment({ content }, props.comment._id);

      props.handleGetComments();

      setContent('');
    } catch (error) {
      handleError(error);
    }
  };

  const handleAction = () => {
    if (props.comment && props.comment.content) {
      handleEditComment();
    } else {
      handleCreateComment();
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
        <Button icon='' onClick={handleAction} text='Submit' type='filled' />
        <Button icon='' onClick={props.handleCancel} text='Cancel' type='outlined' />
      </span>
    </form>
  );
};

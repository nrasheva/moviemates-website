import { useEffect, useState } from 'react';

import styles from './HandleComment.module.css';
import { createComment, editComment } from '../../services/comments.service';
import { handleError } from '../../tools';
import { Button } from '../Button/Button';

export const HandleComment = (props) => {
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    if (props.comment && props.comment.content) {
      setContent(props.comment.content);
    } else {
      setContent('');
    }
  }, [props.comment]);

  useEffect(() => {}, []);

  useEffect(() => {
    const issues = content.length < 1 ? 'You cannot submit an empty comment' : '';

    setWarning(issues);
  }, [content.length]);

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
    setSubmitted(warning.length > 0);

    if (!warning.length) {
      if (props.comment && props.comment.content) {
        handleEditComment();
      } else {
        handleCreateComment();
      }
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
      <div className={styles.actions}>
        <span>{submitted && Boolean(warning.length) && <p className='font-s white'>{warning}</p>}</span>
        <span>
          <Button icon='' onClick={handleAction} text='Submit' type='filled' />
          <Button icon='' onClick={props.handleCancel} text='Cancel' type='outlined' />
        </span>
      </div>
    </form>
  );
};

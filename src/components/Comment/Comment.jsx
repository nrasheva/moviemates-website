import { useMemo, useState } from 'react';

import styles from './Comment.module.css';
import { deleteComment } from '../../services/comments.service';
import { decodeToken, formatTimestamp, handleError } from '../../tools';
import { Button } from '../Button/Button';

export const Comment = (props) => {
  const [expanded, setExpanded] = useState(false);

  const owner = useMemo(() => {
    const decodedToken = decodeToken();

    return decodedToken && decodedToken.email === props.comment.author.email;
  }, [props.comment.author.email]);

  const replies = useMemo(() => {
    return props.comments.filter((comment) => comment.parent === props.comment._id);
  }, [props.comment._id, props.comments]);

  const handleDeleteComment = async () => {
    try {
      await deleteComment(props.comment._id);

      props.handleGetComments();
    } catch (error) {
      handleError(error);
    }
  };

  const scrollToBottom = () => {
    // Use timeout to allow the reply to section to render in order to obtain the correct scrollHeight
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 1);
  };

  return (
    <div className={styles.comment}>
      <p className='font-m semi-bold white'>{`@${props.comment.author.email.split('@')[0]}`}</p>
      <div className={styles.created}>
        <p className='font-s'>{formatTimestamp(props.comment.created)}</p>
        {props.comment.edited && (
          <span className={styles.badge}>
            <p className='font-s'>edited</p>
          </span>
        )}
      </div>
      <p className='font-m white'>{props.comment.content}</p>
      <div className={styles.actions}>
        <Button
          icon='fa-regular fa-comment'
          onClick={() => {
            props.setParent(props.comment);
            scrollToBottom();
          }}
          text=''
          type='round'
        />
        {owner && (
          <>
            <Button
              icon='fa-solid fa-pen'
              onClick={() => {
                props.setEdit(props.comment);
                scrollToBottom();
              }}
              text=''
              type='round'
            />
            <Button icon='fa-solid fa-trash' onClick={handleDeleteComment} text='' type='round' />
          </>
        )}
      </div>
      {expanded && (
        <div className={styles['expanded-container']}>
          {props.comments
            .filter((comment) => comment.parent === props.comment._id)
            .map((comment) => (
              <Comment
                comment={comment}
                comments={props.comments}
                handleGetComments={props.handleGetComments}
                key={comment._id}
                setEdit={props.setEdit}
                setParent={() => props.setParent(comment)}
              />
            ))}
        </div>
      )}
      {replies.length > 0 && (
        <div className={styles.actions}>
          {expanded ? (
            <Button icon='' onClick={() => setExpanded(false)} text='Hide replies' type='empty' />
          ) : (
            <Button
              icon=''
              onClick={() => setExpanded(true)}
              text={`View ${replies.length} ${replies.length > 1 ? 'replies' : 'reply'}`}
              type='empty'
            />
          )}
        </div>
      )}
    </div>
  );
};

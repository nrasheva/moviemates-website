import { useMemo, useState } from 'react';

import styles from './Comment.module.css';
import { decodeToken, formatTimestamp } from '../../tools';
import { Button } from '../Button/Button';

export const Comment = (props) => {
  const [expanded, setExpanded] = useState(false);

  const owner = useMemo(() => {
    const decodedToken = decodeToken();

    return decodedToken && decodedToken.email === props.comment.author.email;
  }, [props.comment.author.email]);

  const author = useMemo(() => {
    return `@${props.comment.author.email.split('@')[0]}`;
  }, [props.comment.author.email]);

  const replies = useMemo(() => {
    return props.comments.filter((comment) => comment.parent === props.comment._id);
  }, [props.comment._id, props.comments]);

  return (
    <div className={styles.comment}>
      <p className='font-m semi-bold white'>{author}</p>
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
        <Button icon='' onClick={() => props.setParent({ author, id: props.comment._id })} text='Reply' type='empty' />
      )}
      {expanded && (
        <div style={{ width: '100%' }}>
          {props.comments
            .filter((comment) => comment.parent === props.comment._id)
            .map((comment) => (
              <Comment
                comment={comment}
                comments={props.comments}
                key={comment._id}
                setParent={() => props.setParent({ author, id: comment._id })}
              />
            ))}
        </div>
      )}
      {replies.length > 0 && (
        <>
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
        </>
      )}
    </div>
  );
};

import { forwardRef, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Discussions.module.css';
import { getComments } from '../../services/comments.service';
import { Button } from '../Button/Button';
import { CreateComment } from '../CreateComment/CreateComment';

export const Discussions = forwardRef((props, ref) => {
  const [comments, setComments] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);

  const navigate = useNavigate();

  const handleGetComments = useCallback(() => {
    if (isAuthenticated) {
      setLoading(true);

      (async () => {
        try {
          const { comments } = await getComments(props.movieId);

          setComments(comments);
          setFetched(true);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      })();
    }
  }, [isAuthenticated, props.movieId]);

  useEffect(() => {
    handleGetComments();
  }, [handleGetComments]);

  return (
    <section ref={ref}>
      <div className='section-heading'>
        <h2 className='white'>Discussions</h2>
      </div>
      <div className={styles.discussions}>
        {comments.length ? (
          <div className={styles.comments}>
            {comments.map((comment) => {
              return (
                <p className='font-m white' key={comment._id}>
                  {comment.content}
                </p>
              );
            })}
          </div>
        ) : (
          <>
            {loading ? (
              <p className='font-m white'>Loading</p>
            ) : visible ? (
              <CreateComment
                handleGetComments={handleGetComments}
                movieId={props.movieId}
                onCancel={() => setVisible(!visible)}
              />
            ) : fetched ? (
              <>
                <p className='font-m white'>There are no discussions for this title</p>
                <Button icon='' onClick={() => setVisible(true)} text='Start discussion' type='outlined' />
              </>
            ) : (
              <>
                <p className='font-m white'>Only logged-in users can view and discuss</p>
                <Button icon='' onClick={() => navigate('/login')} text='Login' type='outlined' />
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
});

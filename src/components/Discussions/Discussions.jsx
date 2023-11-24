import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Discussions.module.css';
import { getComments } from '../../services/comments.service';
import { Button } from '../Button/Button';

export const Discussions = (props) => {
  const [comments, setComments] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);

  const navigate = useNavigate();

  const handleComments = useCallback(() => {
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
    handleComments();
  }, [handleComments]);

  return (
    <section>
      <div className='section-heading'>
        <h2 className='white'>Discussions</h2>
      </div>
      <div className={styles.discussions}>
        {comments.length ? (
          <div className={styles.comments}>
            {comments.map((comment) => {
              return (
                <p className='font-m white' key={comment.id}>
                  {comment.content}
                </p>
              );
            })}
          </div>
        ) : (
          <>
            {loading ? (
              <p className='font-m white'>Loading</p>
            ) : fetched ? (
              <>
                <p className='font-m white'>There are no discussions for this title</p>
                <Button onClick={() => {}} text='Start discussion' type='outlined' />
              </>
            ) : (
              <>
                <p className='font-m white'>Only logged in users can view and discuss</p>
                <Button onClick={() => navigate('/login')} text='Login' type='outlined' />
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

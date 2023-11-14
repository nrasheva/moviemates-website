import styles from './Comments.module.css';

import { useEffect, useState } from 'react';
import { getComments } from '../../services/comments.service';

const comments = [
  {
    _id: '654fd0950fc20b8d222d00cc',
    author: '654e5929b5c60f1dfd5b1e23',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    dislikes: 0,
    likes: 0,
    movie: 299054,
    __v: 0,
  },
  {
    _id: '654fdf0dd5625aba8b2f8d88',
    author: '654e5929b5c60f1dfd5b1e23',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    dislikes: 0,
    likes: 0,
    movie: 299054,
    parent: '654fd0fa67974a37ee253bd0',
    __v: 0,
  },
  {
    _id: '654fd0fa67974a37ee253bd0',
    author: '654e5929b5c60f1dfd5b1e23',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    dislikes: 0,
    likes: 0,
    movie: 299054,
    parent: '654fd0950fc20b8d222d00cc',
    __v: 0,
  },
  {
    _id: '654fdf0dd5625aba8b2f8d86',
    author: '654e5929b5c60f1dfd5b1e23',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    dislikes: 0,
    likes: 0,
    movie: 299054,
    parent: '654fd0fa67974a37ee253bd0',
    __v: 0,
  },
];

export const Comments = () => {
  useEffect(() => {
    (async () => {
      try {
        const { comments } = await getComments(299054);
        console.log(comments);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className={styles['parent-comments']}>
      {comments
        .filter((comment) => !comment.parent) // Top-level comments (no parent)
        .map((comment) => (
          <Comment key={comment._id} comment={comment} comments={comments} />
        ))}
    </div>
  );
};

const Comment = ({ comment, comments }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div key={comment._id}>
      <p>{comment._id}</p>
      {expanded && (
        <div style={{ marginLeft: '20px' }}>
          {comments
            .filter((child) => child.parent === comment._id)
            .map((childComment) => (
              <Comment key={childComment._id} comment={childComment} comments={comments} />
            ))}
        </div>
      )}
      {comments.filter((child) => child.parent === comment._id).length > 0 && (
        <button onClick={handleToggle}>{expanded ? 'Collapse' : 'Expand'}</button>
      )}
    </div>
  );
};

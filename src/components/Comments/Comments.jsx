import { useEffect, useState } from 'react';

import { getComments } from '../../services/comments.service';

export const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { comments } = await getComments(id);

        setComments(comments);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return (
    <div>
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
      <p>{comment.content}</p>
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

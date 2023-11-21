import { useParams } from 'react-router-dom';

import { Comments } from '../../components/Comments/Comments';

export const DetailsPage = () => {
  const { movieId } = useParams();

  return <Comments id={movieId} />;
};

import { useEffect } from 'react';
import { getGenres } from '../../services/genres.service';
import { useDispatch, useSelector } from 'react-redux';
import { setGenres } from '../../redux/reducers/genres';

export const Genres = () => {
  const genres = useSelector((state) => state.genres.genres);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { genres } = await getGenres();

        dispatch(setGenres(genres));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  const handleGenre = (id) => {
    console.log(id);
  };

  return (
    <div>
      {genres.map((genre) => (
        <button key={genre.id} onClick={() => handleGenre(genre.id)}>
          {genre.name}
        </button>
      ))}
    </div>
  );
};

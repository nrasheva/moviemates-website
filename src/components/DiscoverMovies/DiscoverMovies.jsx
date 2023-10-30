import { useEffect } from 'react';
import { getGenres } from '../../services/genres.service';
import { useDispatch, useSelector } from 'react-redux';
import { setGenres } from '../../redux/reducers/genres';
import { setMovies } from '../../redux/reducers/movies';
import { discoverMovies } from '../../services/movies.service';

export const DiscoverMovies = () => {
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

  const handleGenre = async (id) => {
    try {
      const { movies } = await discoverMovies(id);

      dispatch(setMovies(movies));
    } catch (error) {
      console.log(error);
    }
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

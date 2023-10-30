import { configureStore } from '@reduxjs/toolkit';
import { genresReducer } from './reducers/genres';
import { moviesReducer } from './reducers/movies';

export const store = configureStore({
  devTools: { trace: true, traceLimit: 25 },
  reducer: {
    genres: genresReducer,
    movies: moviesReducer,
  },
});

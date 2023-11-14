import { configureStore } from '@reduxjs/toolkit';

import { authenticationReducer } from './reducers/authentication';
import { genresReducer } from './reducers/genres';
import { moviesReducer } from './reducers/movies';

export const store = configureStore({
  devTools: import.meta.env.DEV ? { trace: true, traceLimit: 25 } : false,
  reducer: {
    authentication: authenticationReducer,
    genres: genresReducer,
    movies: moviesReducer,
  },
});

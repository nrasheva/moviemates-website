import { configureStore } from '@reduxjs/toolkit';
import { genresReducer } from './reducers/genres';

export const store = configureStore({
  devTools: { trace: true, traceLimit: 25 },
  reducer: {
    genres: genresReducer,
  },
});

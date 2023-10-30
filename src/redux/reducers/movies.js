import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
};

export const moviesSlice = createSlice({
  initialState,
  name: 'movies',
  reducers: {
    resetMovies: () => initialState,
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { resetMovies, setMovies } = moviesSlice.actions;

export const moviesReducer = moviesSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeMovie: {},
  movies: [],
};

export const moviesSlice = createSlice({
  initialState,
  name: 'movies',
  reducers: {
    resetMovies: () => initialState,
    setActiveMovie: (state, action) => {
      state.activeMovie = action.payload;
    },
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { resetMovies, setActiveMovie, setMovies } = moviesSlice.actions;

export const moviesReducer = moviesSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  watchlist: [],
};

export const watchlistSlice = createSlice({
  initialState,
  name: 'watchlist',
  reducers: {
    resetWatchlist: () => initialState,
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
  },
});

export const { resetWatchlist, setMovies, setWatchlist } = watchlistSlice.actions;

export const watchlistReducer = watchlistSlice.reducer;

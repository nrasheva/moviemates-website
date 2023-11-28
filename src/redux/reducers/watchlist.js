import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  watchlist: [],
};

export const watchlistSlice = createSlice({
  initialState,
  name: 'watchlist',
  reducers: {
    resetWatchlist: () => initialState,
    setWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
  },
});

export const { resetWatchlist, setWatchlist } = watchlistSlice.actions;

export const watchlistReducer = watchlistSlice.reducer;

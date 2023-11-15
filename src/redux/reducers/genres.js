import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  genres: [],
};

export const genresSlice = createSlice({
  initialState,
  name: 'genres',
  reducers: {
    resetGenres: () => initialState,
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { resetGenres, setGenres } = genresSlice.actions;

export const genresReducer = genresSlice.reducer;

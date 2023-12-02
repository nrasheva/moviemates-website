import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeGenre: -1,
  genres: [],
};

export const genresSlice = createSlice({
  initialState,
  name: 'genres',
  reducers: {
    resetGenres: () => initialState,
    setActiveGenre: (state, action) => {
      state.activeGenre = action.payload;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { resetGenres, setActiveGenre, setGenres } = genresSlice.actions;

export const genresReducer = genresSlice.reducer;

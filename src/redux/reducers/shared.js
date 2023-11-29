import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
};

export const sharedSlice = createSlice({
  initialState,
  name: 'shared',
  reducers: {
    resetShared: () => initialState,
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { resetShared, setLoading } = sharedSlice.actions;

export const sharedReducer = sharedSlice.reducer;

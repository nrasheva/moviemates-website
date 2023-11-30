import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: {
    text: '',
    visible: false,
  },
  overlay: true,
};

export const sharedSlice = createSlice({
  initialState,
  name: 'shared',
  reducers: {
    resetShared: () => initialState,
    setLoading: (state, action) => {
      state.overlay = action.payload;
    },
    setModal: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export const { resetShared, setLoading, setModal } = sharedSlice.actions;

export const sharedReducer = sharedSlice.reducer;

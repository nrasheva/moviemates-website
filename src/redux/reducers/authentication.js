import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

export const authenticationSlice = createSlice({
  initialState,
  name: 'authentication',
  reducers: {
    resetAuthentication: () => initialState,
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { resetAuthentication, setIsAuthenticated } = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;

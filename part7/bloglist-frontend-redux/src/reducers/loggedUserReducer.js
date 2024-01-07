import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {
    setUser: (state, action) => action.payload
  }
});

export const { setUser } = loggedUserSlice.actions;
export default loggedUserSlice.reducer;

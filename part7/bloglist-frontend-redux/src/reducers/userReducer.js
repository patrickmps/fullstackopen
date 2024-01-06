import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const userSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setUser2: (state, action) => action.payload
  }
});

export const { setUser2 } = userSlice.actions;
export default userSlice.reducer;

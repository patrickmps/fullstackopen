import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action) => action.payload
  }
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs: (state, action) => action.payload,
    addBlog: (state, action) => state.concat(action.payload),
    updateBlog: (state, action) =>
      state.map((b) => (b.id !== action.payload.id ? b : action.payload)),
    removeBlog: (state, action) => state.filter((b) => b.id !== action.payload)
  }
});

export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions;
export default blogSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificationChange(state, action) {
      return state.replace(state, action.payload);
    }
  }
});

export const setNotification = (message, secounds = 5) => {
  return async (dispatch) => {
    dispatch(notificationChange(message));
    setTimeout(() => {
      dispatch(notificationChange(''));
    }, secounds * 1000);
  };
};

export const { notificationChange } = notificationSlice.actions;
export default notificationSlice.reducer;

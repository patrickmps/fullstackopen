import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import loggedUserReducer from './reducers/loggedUserReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    loggedUser: loggedUserReducer,
    user: userReducer
  }
});

export default store;

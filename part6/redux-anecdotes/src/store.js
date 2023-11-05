import { configureStore } from '@reduxjs/toolkit';

import anecdoteReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import notificationReduce from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReduce
  }
});

export default store;

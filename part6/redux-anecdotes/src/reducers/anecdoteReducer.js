import { createSlice } from '@reduxjs/toolkit';
import anecdotesService from '../services/anecdotesService';

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      return state.map((anecdote) =>
        anecdote.id !== action.payload.id ? anecdote : action.payload
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
});

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions;

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.create(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteOf = (anecdote) => {
  return async (dispatch) => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    const updatedAnecdote = await anecdotesService.update(anecdote.id, changedAnecdote);
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;

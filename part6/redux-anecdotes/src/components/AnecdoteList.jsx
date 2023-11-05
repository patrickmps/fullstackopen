import { useSelector, useDispatch } from 'react-redux';
import { voteOf } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) =>
    filter.trim().length === 0
      ? anecdotes
      : anecdotes.filter((anecdote) =>
          anecdote.content?.toLowerCase().includes(filter.toLowerCase())
        )
  );

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteOf(anecdote));
    dispatch(setNotification(`you vote "${anecdote.content}"`));
  };

  return anecdotes
    .slice()
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    ));
};

export default AnecdoteList;

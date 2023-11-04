import { useSelector, useDispatch } from 'react-redux';
import { voteOf } from '../reducers/anecdoteReducer';
import { notificationChange } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) =>
    filter.trim().length === 0
      ? anecdotes
      : anecdotes.filter((anecdote) =>
          anecdote.content?.toLowerCase().includes(filter.toLowerCase())
        )
  );

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteOf(id));
    const anecdote = anecdotes.find((a) => a.id === id);
    dispatch(notificationChange(`you vote "${anecdote.content}"`));
    setTimeout(() => {
      dispatch(notificationChange(''));
    }, 5000);
  };

  return anecdotes
    .slice()
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    ));
};

export default AnecdoteList;

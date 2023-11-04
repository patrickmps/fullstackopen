import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import anecdotesService from './services/anecdotesService';
import { setAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const notification = useSelector(({ notification }) => notification);
  const dispatch = useDispatch();

  useEffect(() => {
    anecdotesService.getAll().then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      {notification && <Notification />}
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAll, update } from './requests';
import { useContext } from 'react';
import NotificationContext from './contexts/NotificationContext';

const App = () => {
  const queryClient = useQueryClient();
  const [notification, dispatch] = useContext(NotificationContext);

  const updateAnecdoteMutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    }
  });

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1,
    refetchOnWindowFocus: false
  });
  // console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({
      type: 'MSG',
      message: `anecdote '${anecdote.content} voted`
    });
    setTimeout(() => {
      dispatch({ type: 'CLS' });
    }, 5000);
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote?.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

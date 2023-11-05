import { useMutation, useQueryClient } from '@tanstack/react-query';
import { create } from '../requests';
import { useContext } from 'react';
import NotificationContext from '../contexts/NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [notification, dispatch] = useContext(NotificationContext);

  const newNoteMutation = useMutation({
    mutationFn: create,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    }
  });

  const getId = () => (100000 * Math.random()).toFixed(0);

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    const object = {
      content: content,
      id: getId().toString(),
      votes: 0
    };
    event.target.anecdote.value = '';
    newNoteMutation.mutate(object);
    dispatch({
      type: 'MSG',
      message:
        content.length < 5
          ? 'too short anecdote, must have length 5 or more'
          : `anecdote '${content} created`
    });
    setTimeout(() => {
      dispatch({ type: 'CLS' });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

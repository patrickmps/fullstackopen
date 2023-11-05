import { useMutation, useQueryClient } from '@tanstack/react-query';
import { create } from '../requests';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
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

import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';

export const CreateNew = (props) => {
  const navigate = useNavigate();
  const content = useField('text', 'content');
  const author = useField('text', 'author');
  const info = useField('text', 'info');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });
    navigate('/');
  };

  function onResetForm() {
    if (window.confirm('You do want reset form fields?')) {
      content.onReset();
      author.onReset();
      info.onReset();
    }
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form id="form" onSubmit={handleSubmit} onReset={onResetForm}>
        <label htmlFor="content">content</label>
        <input {...content} />
        <br />
        <label htmlFor="author">author</label>
        <input {...author} />
        <br />
        <label htmlFor="info">url for more info</label>
        <input {...info} />
        <br />
        <button type="submit">create</button>
        <button type="reset">reset</button>
      </form>
    </div>
  );
};

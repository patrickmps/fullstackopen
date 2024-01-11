import { useField } from '../hooks';

export const BlogForm = ({ createBlog }) => {
  const title = useField('text', 'title', 'Write the blog title here');
  const author = useField('text', 'author', 'Insert blog author here');
  const url = useField('text', 'url', 'Write the blog address here');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    });

    title.onReset();
    author.onReset();
    url.onReset();
  };

  return (
    <div>
      <h2>Novo Blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url
          <input {...url} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

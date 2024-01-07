import { useParams } from 'react-router-dom';
import { useField } from '../hooks';

export const Blog = ({ blogs, user, removeBlog, updateBlog, addComment }) => {
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);

  const comment = useField('text', 'comment', 'Write the comment here');

  const handleComment = (event) => {
    event.preventDefault();
    addComment({ ...blog, comments: blog.comments.concat(comment.value) }, comment.value);
    comment.onReset();
  };

  const handleLike = () => {
    updateBlog({ ...blog, likes: blog.likes + 1 });
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.user.name}`)) {
      removeBlog(blog.id);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={blogStyle} className="blog">
      <h1>{blog?.title}</h1>

      <div>
        <span>added by {blog?.author}</span>
        <br />
        <span>{blog?.url}</span>
        <br />
        <span>
          likes {blog?.likes} <button onClick={handleLike}>like</button>{' '}
        </span>
        <br />
        <span>{blog?.user.name}</span>
        <br />
        {blog?.user.username === user.username && <button onClick={handleRemove}>remove</button>}
      </div>

      <h2>comments</h2>
      <input {...comment} />
      <button onClick={handleComment}>add comment</button>
      <ul>
        {blog?.comments?.map((c, index) => (
          <li key={index}>{c}</li>
        ))}
      </ul>
    </div>
  );
};

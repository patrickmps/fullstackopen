import { Link } from 'react-router-dom';

export const BlogList = ({ blogs }) => {
  return (
    <>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Link to={`/blogs/${blog.id}`} key={blog.id}>
            {blog.title} by {blog.author}
            <br />
          </Link>
        ))}
    </>
  );
};

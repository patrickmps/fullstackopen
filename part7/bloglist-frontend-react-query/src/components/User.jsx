import { Link, useParams } from 'react-router-dom';

export const User = ({ users }) => {
  const id = useParams().id;
  const user = users?.data?.find((user) => user.id === id) ?? null;

  return (
    <>
      <h1>{user?.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user?.blogs?.map((b) => (
          <li key={b.id}>
            {' '}
            <Link to={`/blogs/${b.id}`}>{b.title}</Link>{' '}
          </li>
        ))}
      </ul>
    </>
  );
};

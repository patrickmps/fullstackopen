import { Link } from 'react-router-dom';

export const Menu = () => {
  const padding = {
    paddingRight: 5
  };
  return (
    <div>
      <Link style={{ padding: 5 }} to="/">
        anecdotes
      </Link>
      <Link style={{ padding: 5 }} to="/create">
        create new
      </Link>
      <Link style={{ padding: 5 }} to="/about">
        about
      </Link>
    </div>
  );
};

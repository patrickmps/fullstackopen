import { Link } from 'react-router-dom';

export const Menu = () => {
  return (
    <div>
      <Link style={{ padding: 5 }} to="/">
        blogs
      </Link>
      <Link style={{ padding: 5 }} to="/users">
        users
      </Link>
    </div>
  );
};

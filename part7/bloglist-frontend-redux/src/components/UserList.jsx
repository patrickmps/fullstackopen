import { Link } from 'react-router-dom';

export const UserList = ({ users }) => {
  return (
    <>
      <h1>Users</h1>
      <table>
        <tr>
          <th>Users</th>
          <th>Blogs added</th>
        </tr>
        {users?.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

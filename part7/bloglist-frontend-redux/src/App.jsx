import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import { Notification } from './components/Notification';
import { LoginForm } from './components/LoginForm';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { setUser } from './reducers/loggedUserReducer';
import { useField } from './hooks';
import { BlogList } from './components/BlogList';
import { Blog } from './components/Blog';
import { addBlog, removeBlog, setBlogs, updateBlog } from './reducers/blogReducer';
import { Menu } from './components/Menu';
import { User } from './components/User';
import { UserList } from './components/UserList';
import { setUsers } from './reducers/userReducer';
import userService from './services/users';
import { BlogForm } from './components/BlogForm';

const App = () => {
  const navigate = useNavigate();
  const notification = useSelector(({ notification }) => notification);
  const blogs = useSelector(({ blogs }) => blogs);
  const user = useSelector(({ loggedUser }) => loggedUser);
  const users = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  const blogFormRef = useRef();
  const username = useField('text', 'username');
  const password = useField('password', 'password');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });

      window.localStorage.setItem('loggedBlogListappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      username.onReset();
      password.onReset();
    } catch (exception) {
      dispatch(setNotification('Wrong credentials!!!!'));
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(setUser(null));
  };

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const response = await blogService.create(blogObject);
      response.user = user;
      dispatch(addBlog(response));
      dispatch(setNotification(`a new blog ${response.title} by ${response.author}`));
    } catch (exception) {
      dispatch(setNotification(exception.message));
    }
  };

  const handleRemoveBlog = async (id) => {
    try {
      await blogService.remove(id);
      dispatch(removeBlog(id));
      dispatch(setNotification('blog as been removed'));
      navigate('/');
    } catch (exception) {
      dispatch(setNotification(exception.message));
    }
  };

  const handleUpdateBlog = async (blog) => {
    try {
      await blogService.update(blog.id, blog);
      dispatch(updateBlog(blog));
    } catch (exception) {
      dispatch(setNotification(exception.message));
    }
  };

  const handleAddComment = async (blog, comment) => {
    try {
      await blogService.addComment(blog.id, comment);
      dispatch(updateBlog(blog));
    } catch (exception) {
      dispatch(setNotification(exception.message));
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setUsers(await userService.getAll()));
      dispatch(setBlogs(await blogService.getAll()));
    };
    fetchData();
  }, []);

  return (
    <>
      <Menu />
      <h2>blog app</h2>
      {notification && <Notification />}
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm username={username} password={password} handleSubmit={handleLogin} />
        </Togglable>
      ) : (
        <>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Togglable buttonLabel="add blog" ref={blogFormRef}>
                    <BlogForm createBlog={createBlog} />
                  </Togglable>
                  <BlogList blogs={blogs} />
                </>
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <Blog
                  blogs={blogs}
                  user={user}
                  removeBlog={handleRemoveBlog}
                  updateBlog={handleUpdateBlog}
                  addComment={handleAddComment}
                />
              }
            />
            <Route path="/users" element={<UserList users={users} />} />
            <Route path="/users/:id" element={<User users={users} />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;

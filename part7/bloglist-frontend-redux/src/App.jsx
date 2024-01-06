import { useState, useEffect, useRef } from 'react';
import { Blog } from './components/Blog';
import loginService from './services/login';
import blogService from './services/blogs';
import { Notification } from './components/Notification';
import { LoginForm } from './components/LoginForm';
import Togglable from './components/Togglable';
import { BlogForm } from './components/BlogForm';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { addBlog, removeBlog, setBlogs, updateBlog } from './reducers/blogReducer';
import { setUser2 } from './reducers/userReducer';

const App = () => {
  const notification = useSelector(({ notification }) => notification);
  const blogs = useSelector(({ blogs }) => blogs);
  const user2 = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem('loggedBlogListappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser2(user));
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setNotification('Wrong credentials!!!!'));
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(setUser2(null));
  };

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const response = await blogService.create(blogObject);
      response.user = user2;
      dispatch(addBlog(response));
      dispatch(setNotification(`a new blog ${response.title} by ${response.author}`));
    } catch (exception) {
      console.log(exception.message);
      dispatch(setNotification(exception.message));
    }
  };

  const handleRemoveBlog = async (id) => {
    try {
      await blogService.remove(id);
      dispatch(removeBlog(id));
      dispatch(setNotification('blog as been removed'));
    } catch (exception) {
      dispatch(setNotification(exception.message));
    }
  };

  const handleUpdateBlog = async (blog) => {
    try {
      dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }));
    } catch (exception) {
      dispatch(setNotification(exception.message));
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser2(user));
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      {notification && <Notification />}
      {user2 === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      ) : (
        <>
          <p>
            {user2.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="add blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user2}
                removeBlog={handleRemoveBlog}
                updateBlog={handleUpdateBlog}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default App;

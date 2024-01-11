import { useEffect, useRef } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import loginService from './services/login';
import blogService from './services/blogs';
import usersService from './services/users';
import { Blog } from './components/Blog';
import { Notification } from './components/Notification';
import { LoginForm } from './components/LoginForm';
import { Togglable } from './components/Togglable';
import { BlogForm } from './components/BlogForm';
import { Menu } from './components/Menu';
import { BlogList } from './components/BlogList';
import { UserList } from './components/UserList';
import { User } from './components/User';
import { useContext } from 'react';
import NotificationContext from './contexts/NotificationContext';
import { useField } from './hooks';
import UserContext from './contexts/UserContext';

const App = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, userDispatch] = useContext(UserContext);
  const [notification, notificationDispatch] = useContext(NotificationContext);
  // const [blogs, setBlogs] = useState([]);
  const username = useField('text', 'username');
  const password = useField('password', 'password');
  // const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });

      window.localStorage.setItem('loggedBlogListappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      userDispatch({
        type: 'LOGIN',
        user
      });
      username.onReset();
      password.onReset();
    } catch (exception) {
      notificationDispatch({
        type: 'MSG',
        message: exception.message
      });
      setTimeout(() => {
        notificationDispatch({ type: 'CLS' });
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    userDispatch({
      type: 'LOGOUT'
    });
  };

  const users = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
    retry: 1,
    refetchOnWindowFocus: false
  });

  const blogs = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
    refetchOnWindowFocus: false
  });

  const createBlog = useMutation({
    mutationFn: blogService.create,
    onSuccess: (data) => {
      blogFormRef.current.toggleVisibility();
      notificationDispatch({
        type: 'MSG',
        message: `a new blog ${data.title} by ${data.author}`
      });
      setTimeout(() => {
        notificationDispatch({ type: 'CLS' });
      }, 5000);
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error) => {
      notificationDispatch({
        type: 'MSG',
        message: error.message
      });
      setTimeout(() => {
        notificationDispatch({ type: 'CLS' });
      }, 5000);
    }
  });

  const removeBlog = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      notificationDispatch({
        type: 'MSG',
        message: `blog as been removed`
      });
      setTimeout(() => {
        notificationDispatch({ type: 'CLS' });
      }, 5000);
      navigate('/');
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error) => {
      notificationDispatch({
        type: 'MSG',
        message: error.message
      });
      setTimeout(() => {
        notificationDispatch({ type: 'CLS' });
      }, 5000);
    }
  });

  const updateBlog = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error) => {
      notificationDispatch({
        type: 'MSG',
        message: error.message
      });
      setTimeout(() => {
        notificationDispatch({ type: 'CLS' });
      }, 5000);
    }
  });

  const commentBlog = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error) => {
      notificationDispatch({
        type: 'MSG',
        message: error.message
      });
      setTimeout(() => {
        notificationDispatch({ type: 'CLS' });
      }, 5000);
    }
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({
        type: 'LOGIN',
        user
      });
      blogService.setToken(user.token);
    }
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
                    <BlogForm createBlog={createBlog.mutate} />
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
                  removeBlog={removeBlog.mutate}
                  updateBlog={updateBlog.mutate}
                  addComment={commentBlog.mutate}
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

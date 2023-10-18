import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import blogService from "./services/blogs";
import { Notification } from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState("");
	const blogFormRef = useRef();

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem(
				"loggedBlogListappUser",
				JSON.stringify(user)
			);
			blogService.setToken(user.token);
			setUser(user);
			setUsername("");
			setPassword("");
		} catch (exception) {
			setMessage({ text: "Wrong credentials", success: false });
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	};

	const handleLogout = () => {
		window.localStorage.clear();
		setUser(null);
	};

	const createBlog = async (blogObject) => {
		try {
			blogFormRef.current.toggleVisibility();
			const response = await blogService.create(blogObject);
			response.user = user;
			setBlogs(blogs.concat(response));
			setMessage({
				text: `a new blog ${response.title} by ${response.author}`,
				success: true,
			});
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		} catch (exception) {
			setMessage({ text: exception.message, success: false });
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	};

	const handleRemoveBlog = async (id) => {
		try {
			await blogService.remove(id);
			setBlogs(blogs.filter((b) => b.id !== id));
			setMessage({
				text: `blog as been removed`,
				success: true,
			});
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		} catch (exception) {
			setMessage({ text: exception.message, success: false });
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	};

	const handleUpdateBlog = async (updateBlog) => {
		try {
			await blogService.update(updateBlog?.id, { likes: updateBlog.likes + 1 });
			setBlogs(
				blogs.map((b) => {
					if (b.id === updateBlog?.id) {
						b.likes += 1;
					}
					return b;
				})
			);
		} catch (exception) {
			setMessage({ text: exception.message, success: false });
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	};

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogListappUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	return (
		<div>
			<h2>blogs</h2>
			{message && <Notification message={message} />}
			{user === null ? (
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
						{user.name} logged in <button onClick={handleLogout}>logout</button>
					</p>
					<Togglable buttonLabel="add blog" ref={blogFormRef}>
						<BlogForm createBlog={createBlog} />
					</Togglable>
					{blogs
						.sort((a, b) => b.likes - a.likes)
						.map((blog) => (
							<Blog
								key={blog.id}
								blog={blog}
								user={user}
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

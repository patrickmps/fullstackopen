import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import blogService from "./services/blogs";
import { Notification } from "./components/Notification";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
	const [message, setMessage] = useState("");

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

	const handleLogout = async () => {
		window.localStorage.clear();
		setUser(null);
	};

	const handleCreateBlog = async (event) => {
		event.preventDefault();

		try {
			const response = await blogService.create(newBlog);
			setBlogs(blogs.concat(response));
			setNewBlog("");
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

	const handleBlogChange = (event) => {
		console.log(newBlog);
		setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
	};

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type="text"
					value={username}
					name="username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	);

	const blogForm = () => (
		<form onSubmit={handleCreateBlog}>
			<div>
				title
				<input
					type="text"
					value={newBlog.title || ""}
					name="title"
					onChange={handleBlogChange}
				/>
			</div>
			<div>
				author
				<input
					type="text"
					value={newBlog.author || ""}
					name="author"
					onChange={handleBlogChange}
				/>
			</div>
			<div>
				url
				<input
					type="text"
					value={newBlog.url || ""}
					name="url"
					onChange={handleBlogChange}
				/>
			</div>
			<button type="submit">create</button>
		</form>
	);

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
				loginForm()
			) : (
				<>
					<p>
						{user.name} logged in <button onClick={handleLogout}>logout</button>
					</p>
					{blogForm()}
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</>
			)}
		</div>
	);
};

export default App;

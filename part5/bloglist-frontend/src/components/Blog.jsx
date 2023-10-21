import { useState } from "react";

const Blog = ({ blog, user, removeBlog, updateBlog }) => {
	const [visible, setVisible] = useState(false);

	const showWhenVisible = { display: visible ? "" : "none" };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const handleLike = () => {
		updateBlog(blog);
	};

	const handleRemove = () => {
		if (window.confirm(`Remove blog "${blog.title}" by ${blog.user.name}`)) {
			removeBlog(blog.id);
		}
	};

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	return (
		<div style={blogStyle} className="blog">
			<span>
				{blog.title} {blog.author}
			</span>
			<button onClick={toggleVisibility} id="toggle-btn">
				{visible ? "hide" : "view"}
			</button>
			<br />
			<div style={showWhenVisible} id="hidden">
				<span>{blog.url}</span>
				<br />
				<span>
					likes {blog.likes} <button onClick={handleLike}>like</button>{" "}
				</span>
				<br />
				<span>{blog.user.name}</span>
				<br />
				{blog.user.username === user.username && (
					<button onClick={handleRemove}>remove</button>
				)}
			</div>
		</div>
	);
};

export default Blog;

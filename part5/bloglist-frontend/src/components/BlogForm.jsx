import { useState } from "react";

const BlogForm = ({ createBlog }) => {
	const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

	const handleBlogChange = (event) => {
		setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
	};

	const addBlog = (event) => {
		event.preventDefault();
		createBlog(newBlog);

		setNewBlog("");
	};

	return (
		<div>
			<h2>Novo Blog</h2>

			<form onSubmit={addBlog}>
				<div>
					title
					<input
						id="input-title"
						placeholder="Write the blog title here"
						type="text"
						value={newBlog.title || ""}
						name="title"
						onChange={handleBlogChange}
					/>
				</div>
				<div>
					author
					<input
						id="input-author"
						placeholder="Insert blog author here"
						type="text"
						value={newBlog.author || ""}
						name="author"
						onChange={handleBlogChange}
					/>
				</div>
				<div>
					url
					<input
						id="input-url"
						placeholder="Write the blog address here"
						type="text"
						value={newBlog.url || ""}
						name="url"
						onChange={handleBlogChange}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default BlogForm;

import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_BOOK } from "../queries";

export const NewBook = ({ setError }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [published, setPublished] = useState(0);
	const [genre, setGenre] = useState("");
	const [genres, setGenres] = useState([]);

	const [addBook] = useMutation(ADD_BOOK, {
		onError: (error) => {
			const messages = error.graphQLErrors.map((e) => e.message).join("\n");
			setError(messages);
		},
		updateQueries: ["allBooks"],
	});

	const submit = async (event) => {
		event.preventDefault();

		addBook({ variables: { title, published, author, genres } });

		setTitle("");
		setPublished("");
		setAuthor("");
		setGenres([]);
		setGenre("");
	};

	const addGenre = () => {
		setGenres(genres.concat(genre));
		setGenre("");
	};

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					title
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					published
					<input
						type="number"
						value={published}
						onChange={({ target }) => setPublished(Number(target.value))}
					/>
				</div>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type="button">
						add genre
					</button>
				</div>
				<div>genres: {genres.join(" ")}</div>
				<button type="submit">create book</button>
			</form>
		</div>
	);
};

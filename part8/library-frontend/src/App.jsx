import { useState } from "react";
import "./App.css";
import { Authors } from "./components/Authors";
import { Books } from "./components/Books";
import { NewBook } from "./components/NewBook";

import { gql, useMutation, useQuery } from "@apollo/client";

const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
			id
		}
	}
`;

const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			author
			published
			genres
			id
		}
	}
`;

const ADD_BOOK = gql`
	mutation (
		$title: String!
		$published: Int!
		$author: String!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			published: $published
			author: $author
			genres: $genres
		) {
			author
			genres
			id
			published
			title
		}
	}
`;

const EDIT_AUTHOR = gql`
	mutation ($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			id
			bookCount
			born
		}
	}
`;

const App = () => {
	const [page, setPage] = useState("authors");
	const authors = useQuery(ALL_AUTHORS);
	const books = useQuery(ALL_BOOKS);
	const [addBook] = useMutation(ADD_BOOK, {
		refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
	});
	const [editAuthor] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	});

	return (
		<div>
			<div>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
				<button onClick={() => setPage("add")}>add book</button>
			</div>

			<Authors
				show={page === "authors"}
				authors={authors}
				editAuthor={editAuthor}
			/>

			<Books show={page === "books"} books={books} />

			<NewBook show={page === "add"} addBook={addBook} />
		</div>
	);
};

export default App;

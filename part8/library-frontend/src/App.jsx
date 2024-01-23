import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Authors } from "./components/Authors";
import { Books } from "./components/Books";
import { NewBook } from "./components/NewBook";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { useState } from "react";
import Notify from "./components/Notify";
import { LoginForm } from "./components/LoginForm";
import { Recommended } from "./components/Recommended";

export const updateCache = (cache, query, addedBook) => {
	const uniqByTitle = (a) => {
		let seen = new Set();
		return a.filter((item) => {
			let k = item.title;
			return seen.has(k) ? false : seen.add(k);
		});
	};

	cache.updateQuery(query, ({ allBooks }) => {
		return {
			allBooks: uniqByTitle(allBooks.concat(addedBook)),
		};
	});
};

const App = () => {
	const client = useApolloClient();
	const [token, setToken] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const authors = useQuery(ALL_AUTHORS);
	const books = useQuery(ALL_BOOKS);

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 10000);
	};

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};

	useSubscription(BOOK_ADDED, {
		onData: ({ data, client }) => {
			const addedBook = data.data.bookAdded;
			notify(`${addedBook.title} added`);
			updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
		},
	});

	return !token ? (
		<>
			<Notify errorMessage={errorMessage} />
			<LoginForm setToken={setToken} setError={notify} />
		</>
	) : (
		<>
			<div>
				<Link to="/authors">authors</Link>
				<Link to="/">books</Link>
				<Link to="/add-book">add book</Link>
				<Link to="/recommendations">recommended</Link>
				<a onClick={logout}>logout</a>
			</div>
			<Notify errorMessage={errorMessage} />
			<Routes>
				<Route path="/" element={<Books books={books} />} />
				<Route
					path="/authors"
					element={<Authors authors={authors} setError={setErrorMessage} />}
				/>
				<Route
					path="/add-book"
					element={<NewBook setError={setErrorMessage} />}
				/>
				<Route path="/recommendations" element={<Recommended />} />
			</Routes>
		</>
	);
};

export default App;

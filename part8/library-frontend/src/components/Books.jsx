import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

export const Books = ({ books }) => {
	const [genre, setGenre] = useState(null);
	const booksFiltered = useQuery(ALL_BOOKS, { variables: { genre: genre } });
	const genres = new Set();

	books?.data?.allBooks.map((a) => genres.add(...a.genres));

	if (booksFiltered?.loading) {
		return <p>...loading</p>;
	}

	return (
		<div>
			<h2>books</h2>
			{genre ? (
				<p>
					in genre <strong>{genre}</strong>
				</p>
			) : (
				<p>displaying all genres</p>
			)}
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{booksFiltered?.data?.allBooks?.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			<button onClick={() => setGenre(null)}>all genres</button>
			{[...genres].map((g) => (
				<button key={g} onClick={() => setGenre(g)}>
					{g}
				</button>
			))}
		</div>
	);
};

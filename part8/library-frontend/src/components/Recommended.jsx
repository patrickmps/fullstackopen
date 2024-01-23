import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

export const Recommended = () => {
	const user = useQuery(ME);
	const booksFiltered = useQuery(ALL_BOOKS, {
		variables: { genre: user?.data?.me.favoriteGenre },
	});

	if (booksFiltered?.loading) {
		return <p>...loading</p>;
	}

	return (
		<div>
			<h2>recommendations</h2>
			<p>
				books in your favorite genre{" "}
				<strong>{user?.data?.me.favoriteGenre}</strong>
			</p>
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
		</div>
	);
};

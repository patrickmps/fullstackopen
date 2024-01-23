import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

export const Authors = ({ authors, setError }) => {
	const [name, setName] = useState("");
	const [born, setBorn] = useState(0);

	const [editAuthor] = useMutation(EDIT_AUTHOR, {
		onError: (error) => {
			const messages = error.graphQLErrors.map((e) => e.message).join("\n");
			setError(messages);
		},
		refetchQueries: [{ query: ALL_AUTHORS }],
	});

	if (authors?.loading) {
		return <p>...loading</p>;
	}

	const submit = async (event) => {
		event.preventDefault();

		editAuthor({ variables: { name, setBornTo: born } });

		setName("");
		setBorn(0);
	};

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
					</tr>
					{authors?.data.allAuthors.map((a, index) => (
						<tr key={index}>
							<td>{a.name}</td>
							<td>{a.born}</td>
						</tr>
					))}
				</tbody>
			</table>

			<h2>Set birthyear</h2>
			<form onSubmit={submit}>
				<select value={name} onChange={(event) => setName(event.target.value)}>
					{authors.data.allAuthors.map((a, index) => (
						<option key={index} value={a.name}>
							{a.name}
						</option>
					))}
				</select>
				<div>
					born
					<input
						value={born}
						onChange={({ target }) => setBorn(Number(target.value))}
					/>
				</div>
				<button type="submit">update author</button>
			</form>
		</div>
	);
};

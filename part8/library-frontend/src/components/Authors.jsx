import { useState } from "react";

export const Authors = (props) => {
	const [name, setName] = useState("");
	const [born, setBorn] = useState(0);

	if (!props.show) {
		return null;
	}

	if (props?.authors?.loading) {
		return <p>...loading</p>;
	}

	const submit = async (event) => {
		event.preventDefault();

		props.editAuthor({ variables: { name, setBornTo: born } });

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
						<th>books</th>
					</tr>
					{props.authors.data.allAuthors.map((a) => (
						<tr key={a.id}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>

			<h2>Set birthyear</h2>
			<form onSubmit={submit}>
				<select value={name} onChange={(event) => setName(event.target.value)}>
					{props.authors.data.allAuthors.map((a) => (
						<option key={a.id} value={a.name}>
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

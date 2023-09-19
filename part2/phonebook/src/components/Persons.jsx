export const Persons = ({ persons, onDelete }) => {
	return (
		<table>
			<tbody>
				{persons.map((person) => (
					<PersonRow
						key={person.id}
						person={person}
						onDelete={onDelete}
					/>
				))}
			</tbody>
		</table>
	);
};

const PersonRow = ({ person, onDelete }) => {
	return (
		<tr>
			<td>{person.name}</td>
			<td>{person.number}</td>
			<td><button onClick={() => onDelete(person)}>delete</button></td>
		</tr>
	);
};

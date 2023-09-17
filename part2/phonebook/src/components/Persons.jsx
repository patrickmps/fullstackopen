export const Persons = ({ persons }) => {
	return (
		<table>
			<tbody>
				{persons.map((person) => (
					<PersonRow
						key={person.id}
						name={person.name}
						number={person.number}
					/>
				))}
			</tbody>
		</table>
	);
};

const PersonRow = ({ name, number }) => {
	return (
		<tr>
			<td>{name}</td>
			<td>{number}</td>
		</tr>
	);
};

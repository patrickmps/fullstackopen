import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	const addPhoneNumber = (event) => {
		event.preventDefault();
		const newPerson = {
			name: newName,
		};

		const equalObjects = persons.filter(
			(person) =>
				JSON.stringify(person).toLowerCase() ===
				JSON.stringify(newPerson).toLowerCase()
		);

		if (newPerson.name.trim().length === 0) {
			window.alert(`The name is empty.`);
		} else if (equalObjects.length > 0) {
			window.alert(`${newPerson.name} is already added to phonebook.`);
		} else {
			setPersons(persons.concat(newPerson));
			setNewName("");
		}
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addPhoneNumber}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<span key={person.name}>
					{person.name}
					<br />
				</span>
			))}
		</div>
	);
};

export default App;

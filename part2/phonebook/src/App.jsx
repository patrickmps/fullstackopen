import { useState } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [search, setSearch] = useState("");

	const showPersons =
		search.trim().length === 0
			? persons
			: persons.filter((person) =>
					person.name.toLowerCase().includes(search.toLowerCase())
			  );

	const addPhoneNumber = (event) => {
		event.preventDefault();
		const newPerson = {
			id: persons.length + 1,
			name: newName,
			number: newNumber,
		};

		const equalObjects = persons.filter(
			(person) =>
				JSON.stringify(person).toLowerCase() ===
				JSON.stringify(newPerson).toLowerCase()
		);

		if (
			newPerson.name.trim().length === 0 ||
			newPerson.number.trim().length === 0
		) {
			window.alert(`The name or number is empty.`);
		} else if (equalObjects.length > 0) {
			window.alert(`${newPerson.name} is already added to phonebook.`);
		} else {
			setPersons(persons.concat(newPerson));
			setNewName("");
			setNewNumber("");
		}
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};
	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={search} onChange={handleSearchChange} />

			<h2>Add a new</h2>
			<PersonForm
				onSubmit={addPhoneNumber}
				valueName={newName}
				onChangeName={handleNameChange}
				valueNumber={newNumber}
				onChangeNumber={handleNumberChange}
			/>

			<h2>Numbers</h2>
			<Persons persons={showPersons} />

		</div>
	);
};

export default App;

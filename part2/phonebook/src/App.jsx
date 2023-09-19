import { useEffect, useState } from "react";
import personService from "./services/personService";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([]);
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
			name: newName,
			number: newNumber,
		};

		const equalObjects = persons.filter(
			(person) =>
				JSON.stringify(person.name).toLowerCase() ===
				JSON.stringify(newPerson.name).toLowerCase()
		);

		if (
			newPerson.name.trim().length === 0 ||
			newPerson.number.trim().length === 0
		) {
			window.alert(`The name or number is empty.`);
		} else if (equalObjects.length > 0) {
			if (
				window.confirm(
					`${newPerson.name} is already added to phonebook, replace te old number with a new one?`
				)
			) {
				const updateNumber = { ...equalObjects[0], number: newPerson.number };
				personService
					.update(updateNumber.id, updateNumber)
					.then((response) =>
						setPersons(
							persons.map((p) => (p.id !== updateNumber.id ? p : response))
						)
					);
			}
		} else {
			personService
				.create(newPerson)
				.then((response) => setPersons(persons.concat(response)));
			setNewName("");
			setNewNumber("");
		}
	};

	const deletePerson = (person) => {
		if (window.confirm(`Delete ${person.name}?`)) {
			personService.remove(person.id);
			setPersons(persons.filter((p) => person.id != p.id));
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

	useEffect(() => {
		personService.getAll().then((response) => setPersons(response));
	}, []);

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
			<Persons persons={showPersons} onDelete={deletePerson} />
		</div>
	);
};

export default App;

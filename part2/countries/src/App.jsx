import { useState } from "react";
import "./App.css";
import { Search } from "./components/Search/Search";
import { useEffect } from "react";
import countriesService from "./services/countriesService";
import { CountryInfo } from "./components/CountryInfo/CountryInfo";
import { ListCountries } from "./components/ListCountries/ListCountries";

function App() {
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState("");

	const showCountries =
		search.trim().length === 0
			? countries
			: countries.filter((country) =>
					country.name.common.toLowerCase().includes(search.toLowerCase())
			  );

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	useEffect(() => {
		countriesService.getAll().then((data) => setCountries(data));
	}, []);

	return (
		<>
			<Search value={search} onChange={handleSearchChange} />

			{countries && showCountries.length === 1 ? (
				<CountryInfo country={showCountries[0]} />
			) : (
				<ListCountries countries={showCountries} setSearch={setSearch} />
			)}
		</>
	);
}

export default App;

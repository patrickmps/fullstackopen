import './style.css'

export const ListCountries = ({ countries, setSearch }) => {
	return countries.length < 10 ? (
		<table>
			<tbody>
				{countries.map((country) => (
					<tr key={country.name.official}>
						<td >{country.name.common}</td>
            <td><button onClick={() => setSearch(country.name.common)}>show</button></td>
					</tr>
				))}
			</tbody>
		</table>
	) : (
		<p>Too many matches, specify another filter</p>
	);
};

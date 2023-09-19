import "./style.css";

export const CountryInfo = ({ country }) => {
	return (
		<div>
			<h1>{country.name.common}</h1>
			<span>
				Capital(s):{" "}
				{country.capital.map((capital, i) =>
					i === country.capital.length - 1 ? capital : `${capital}, `
				)}
				
			</span>
      <span>Area: {new Intl.NumberFormat({ style: 'unity', unit: 'area-square-kilometer' }).format(country.area)} km²</span>
			<span>
				Languages(s):{" "}
				{Object.values(country.languages).map((language, i) =>
					i === Object.values(country.languages).length - 1 ? language : `${language}, `
				)}
			</span>

      <img src={country.flags.svg} alt={`${country.name.common} flag`} />
		</div>
	);
};

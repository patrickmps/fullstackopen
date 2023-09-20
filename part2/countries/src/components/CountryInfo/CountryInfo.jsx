import { useEffect, useState } from "react";
import weatherService from "../../services/weatherService";
import "./style.css";

export const CountryInfo = ({ country }) => {
	const [weather, setWeather] = useState();

	useEffect(() => {
		weatherService
			.get(country.name.common.trim())
			.then((response) => setWeather(response));
	}, []);

	return (
		<div>
			<h1>{country.name.common}</h1>
			<span>
				Capital(s):{" "}
				{country.capital.map((capital, i) =>
					i === country.capital.length - 1 ? capital : `${capital}, `
				)}
			</span>
			<span>
				Area:{" "}
				{new Intl.NumberFormat({
					style: "unity",
					unit: "area-square-kilometer",
				}).format(country.area)}{" "}
				km²
			</span>
			<span>
				Languages(s):{" "}
				{Object.values(country.languages).map((language, i) =>
					i === Object.values(country.languages).length - 1
						? language
						: `${language}, `
				)}
			</span>

			<img src={country.flags.svg} alt={`${country.name.common} flag`} />

			<h1>{`Weather in ${country.name.common}`}</h1>
			<span>Temperature: {weather && Math.round(weather?.main.temp)}° C</span>
			<span>
				Wind: {`${weather?.wind.speed.toString().replace(".", ",")}m/s`}
			</span>
			<img id="weather-img"
				src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
			/>
		</div>
	);
};

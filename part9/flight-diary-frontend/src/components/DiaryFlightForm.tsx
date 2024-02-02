import { useField } from "../hooks";
import { NewDiaryFlightTypes, Visibility, Weather } from "../types";

type DiaryFlightFormTypes = {
	addDiaryFlight: (object: NewDiaryFlightTypes) => void;
	error: string | null;
};

export const DiaryFlightForm = ({
	addDiaryFlight,
	error,
}: DiaryFlightFormTypes) => {
	const date = useField({
		type: "date",
		name: "date",
		placeholder: "YYYY-MM-DD",
	});

	const visibility = useField({
		type: "radio",
		name: "visibility",
	});

	const weather = useField({
		type: "radio",
		name: "weather",
	});
	const comment = useField({
		type: "text",
		name: "weather",
		placeholder: "How was the flight experience?",
	});

	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();

		const newDiaryFlight: NewDiaryFlightTypes = {
			date: date.value,
			visibility: visibility.value as Visibility,
			weather: weather.value as Weather,
			comment: comment.value,
		};

		addDiaryFlight(newDiaryFlight);
	};

	const style: { color: string } = {
		color: "red",
	};

	console.log(Object.values(Visibility));

	return (
		<>
			<h1>New Diary</h1>
			{error && <p style={style}>{error}</p>}
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="date">Date</label>
					<input {...date} />
				</div>
				<fieldset>
					<legend>Visibility</legend>
					{Object.entries(Visibility).map((v, index) => (
						<label key={index} htmlFor={v[0]}>
							{v[0]}
							<input {...visibility} value={v[1]} />
						</label>
					))}
				</fieldset>
				<fieldset>
					<legend>Weather</legend>
					{Object.entries(Weather).map((v, index) => (
						<label key={index} htmlFor={v[0]}>
							{v[0]}
							<input {...weather} value={v[1]} />
						</label>
					))}
				</fieldset>
				<div>
					<label htmlFor="comment">Comment</label>
					<input {...comment} />
				</div>
				<button type="submit">add</button>
			</form>
		</>
	);
};

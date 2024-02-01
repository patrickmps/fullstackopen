import { useField } from "../hooks";
import { NewDiaryFlightTypes } from "../types";

export const DiaryFlightForm = ({
	addDiaryFlight,
}: {
	addDiaryFlight: (object: NewDiaryFlightTypes) => void;
}) => {
	const date = useField({
		type: "text",
		name: "date",
		placeholder: "YYYY-MM-DD",
	});
	const visibility = useField({
		type: "text",
		name: "visibility",
		placeholder: "How was the visibility?",
	});
	const weather = useField({
		type: "text",
		name: "weather",
		placeholder: "How was the weather?",
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
			visibility: visibility.value,
			weather: weather.value,
			comment: comment.value,
		};

		addDiaryFlight(newDiaryFlight);
	};

	return (
		<>
			<h1>New Diary</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="date">Date</label>
					<input {...date} />
				</div>
				<div>
					<label htmlFor="visibility">Visibility</label>
					<input {...visibility} />
				</div>
				<div>
					<label htmlFor="weather">Weather</label>
					<input {...weather} />
				</div>
				<div>
					<label htmlFor="comment">Comment</label>
					<input {...comment} />
				</div>
				<button type="submit">add</button>
			</form>
		</>
	);
};

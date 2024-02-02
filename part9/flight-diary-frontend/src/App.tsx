import { useEffect, useState } from "react";
import "./App.css";
import { DiaryFlightTypes, NewDiaryFlightTypes } from "./types";
import { addDiaryFlight, getAllDiaries } from "./services/diariesService";
import { DiaryEntries } from "./components/DiaryEntries";
import { DiaryFlightForm } from "./components/DiaryFlightForm";

function App() {
	const [diaries, setDiaries] = useState<DiaryFlightTypes[]>([]);
	const [error, setError] = useState<string | null>(null);

	const newDiaryFlight = (object: NewDiaryFlightTypes) => {
		addDiaryFlight(object)
			.then((data) => setDiaries(diaries.concat(data)))
			.catch((error) => {
				setError(error.message);
				setTimeout(() => {
					setError(null);
				}, 5000);
			});
	};

	useEffect(() => {
		getAllDiaries().then((data) => setDiaries(data));
	}, []);

	return (
		<>
			<DiaryFlightForm addDiaryFlight={newDiaryFlight} error={error} />
			<DiaryEntries diaries={diaries} />
		</>
	);
}

export default App;

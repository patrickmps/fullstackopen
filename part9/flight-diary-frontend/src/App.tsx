import { useEffect, useState } from "react";
import "./App.css";
import { DiaryFlightTypes, NewDiaryFlightTypes } from "./types";
import { addDiaryFlight, getAllDiaries } from "./services/diariesService";
import { DiaryEntries } from "./components/DiaryEntries";
import { DiaryFlightForm } from "./components/DiaryFlightForm";

function App() {
	const [diaries, setDiaries] = useState<DiaryFlightTypes[]>([]);

	const newDiaryFlight = (object: NewDiaryFlightTypes) => {
		addDiaryFlight(object).then((data) => setDiaries(diaries.concat(data)));
	};

	useEffect(() => {
		getAllDiaries().then((data) => setDiaries(data));
	}, []);

	return (
		<>
			<DiaryFlightForm addDiaryFlight={newDiaryFlight} />
			<DiaryEntries diaries={diaries} />
		</>
	);
}

export default App;

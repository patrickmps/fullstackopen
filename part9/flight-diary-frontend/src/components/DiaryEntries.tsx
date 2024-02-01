import { DiaryFlightTypes } from "../types";

export const DiaryEntries = ({ diaries }: { diaries: DiaryFlightTypes[] }) => {
	return (
		<>
			<h1>Diary Entries</h1>
			{diaries.map((diary) => (
				<div key={diary.id}>
					<br />
					<h2>{diary.date}</h2>
					<br />
					{diary.visibility}
					<br />
					{diary.weather}
				</div>
			))}
		</>
	);
};

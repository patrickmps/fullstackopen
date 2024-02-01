export interface DiaryFlightTypes {
	id: number;
	date: string;
	weather: string;
	visibility: string;
}

export type NewDiaryFlightTypes = Omit<DiaryFlightTypes, "id"> & {
	comment: string;
};

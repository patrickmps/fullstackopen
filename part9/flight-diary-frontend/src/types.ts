export enum Weather {
	Sunny = "sunny",
	Rainy = "rainy",
	Cloudy = "cloudy",
	Stormy = "stormy",
	Windy = "windy",
}

export enum Visibility {
	Great = "great",
	Good = "good",
	Ok = "ok",
	Poor = "poor",
}
export interface DiaryFlightTypes {
	id: number;
	date: string;
	weather: Weather;
	visibility: Visibility;
}

export type NewDiaryFlightTypes = Omit<DiaryFlightTypes, "id"> & {
	comment: string;
};

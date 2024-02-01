import axios from "axios";
import { DiaryFlightTypes, NewDiaryFlightTypes } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = () => {
	return axios
		.get<DiaryFlightTypes[]>(baseUrl)
		.then((response) => response.data);
};

export const addDiaryFlight = (object: NewDiaryFlightTypes) => {
	return axios
		.post<DiaryFlightTypes>(baseUrl, object)
		.then((response) => response.data);
};

import axios from "axios";
import {
	PatientTypes,
	PatientFormValues,
	EntryFormValues,
	Entry,
} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
	const { data } = await axios.get<PatientTypes[]>(`${apiBaseUrl}/patients`);

	return data;
};

const getById = async (id: string) => {
	const { data } = await axios.get<PatientTypes>(
		`${apiBaseUrl}/patients/${id}`
	);

	return data;
};

const addEntry = async (id: string, entry: EntryFormValues) => {
	const { data } = await axios.post<Entry>(
		`${apiBaseUrl}/patients/${id}/entries`,
		entry
	);

	return data;
};

const create = async (object: PatientFormValues) => {
	const { data } = await axios.post<PatientTypes>(
		`${apiBaseUrl}/patients`,
		object
	);

	return data;
};

export default {
	getAll,
	getById,
	create,
	addEntry,
};

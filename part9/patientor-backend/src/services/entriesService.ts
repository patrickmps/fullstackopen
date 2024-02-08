import { Entry, NewEntry } from "../types";
import patients from "../data/patients";
import utils from "../utils";
import { v1 as uuid } from "uuid";
const id = uuid();

const addEntry = ({
	entry,
	patientId,
}: {
	entry: NewEntry;
	patientId: string;
}): Entry => {
	entry = utils.toNewEntry(entry);

	const newEntry = {
		id,
		...entry,
	};

	const patient = patients.find((p) => p.id === patientId);

	patient?.entries?.push(newEntry);

	return newEntry;
};

export default {
	addEntry,
};

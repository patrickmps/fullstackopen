import { Gender, NewPatientTypes } from "./types";

const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
	if (!isString(name)) {
		throw new Error("Incorrect or missing name");
	}

	return name;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
	if (!isString(date) || !isDate(date)) {
		throw new Error("Incorrect or missing date: " + date);
	}
	return date;
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender)
		.map((v) => v.toString())
		.includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if (!isString(gender) || !isGender(gender)) {
		throw new Error("Incorrect or missing gender: " + gender);
	}
	return gender;
};

const parseOccupation = (occupation: unknown): string => {
	if (!isString(occupation)) {
		throw new Error("Incorrect or missing occupation");
	}

	return occupation;
};

const parseSsn = (ssn: unknown): string => {
	if (!isString(ssn)) {
		throw new Error("Incorrect or missing ssn");
	}

	return ssn;
};

const toNewPatient = (object: unknown): NewPatientTypes => {
	if (!object || typeof object !== "object") {
		throw new Error("Incorrect or missing data");
	}

	if (
		"name" in object &&
		"dateOfBirth" in object &&
		"gender" in object &&
		"occupation" in object &&
		"ssn" in object
	) {
		const newPatient: NewPatientTypes = {
			name: parseName(object.name),
			dateOfBirth: parseDate(object.dateOfBirth),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation),
			ssn: parseSsn(object.ssn),
		};

		return newPatient;
	}

	throw new Error("Incorrect data: some fields are missing");
};

export default {
	toNewPatient,
};

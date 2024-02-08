import { Diagnosis, Gender, NewEntry, NewPatientTypes } from "./types";

const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};
const isNumber = (number: unknown): number is number => {
	return typeof number === "number" || number instanceof Number;
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

const parseDescription = (description: unknown): string => {
	if (!isString(description)) {
		throw new Error("Incorrect or missing description");
	}
	return description;
};

const parseSpecialist = (specialist: unknown): string => {
	if (!isString(specialist)) {
		throw new Error("Incorrect or missing specialist");
	}
	return specialist;
};
const parseEmployerName = (employerName: unknown): string => {
	if (!isString(employerName)) {
		throw new Error("Incorrect or missing employerName");
	}
	return employerName;
};

const parseDischarge = (discharge: unknown): object => {
	if (!discharge || typeof discharge !== "object") {
		throw new Error("Incorrect or missing discharge");
	}

	if ("criteria" in discharge && "date" in discharge) {
		if (!isString(discharge.date) || !isDate(discharge.date)) {
			throw new Error("Incorrect or missing date in discharge");
		}
		if (!isString(discharge.criteria)) {
			throw new Error("Incorrect or missing criteria in discharge");
		}

		return discharge as { date: string; criteria: string };
	}
	return discharge;
};

const parseSickLeave = (sickLeave: unknown): object => {
	if (!sickLeave || typeof sickLeave !== "object") {
		throw new Error("Incorrect or missing sickLeave");
	}

	if ("startDate" in sickLeave) {
		if (!isString(sickLeave.startDate) || !isDate(sickLeave.startDate)) {
			throw new Error("Incorrect or missing startDate in sickLeave");
		}
		if (
			"endDate" in sickLeave &&
			(!isString(sickLeave.endDate) || !isDate(sickLeave.endDate))
		) {
			throw new Error("Incorrect or missing endDate in sickLeave");
		}

		return sickLeave as { startDate: string; endDate: string };
	}
	return sickLeave;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
	if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
		return [] as Array<Diagnosis["code"]>;
	}

	return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseHealthCheckRating = (rating: unknown): number => {
	if (!isNumber(rating)) {
		throw new Error("Incorrect or missing rating");
	}

	return rating;
};

const toNewEntry = (object: unknown): NewEntry => {
	if (!object || typeof object !== "object") {
		throw new Error("Incorrect or missing data");
	}

	if (
		"description" in object &&
		"date" in object &&
		"specialist" in object &&
		"type" in object
	) {
		switch (object.type) {
			case "Hospital":
				if ("discharge" in object) {
					return <NewEntry>{
						date: parseDate(object.date),
						description: parseDescription(object.description),
						specialist: parseSpecialist(object.specialist),
						discharge: parseDischarge(object.discharge),
						diagnosisCodes:
							"diagnosisCodes" in object
								? parseDiagnosisCodes(object.diagnosisCodes)
								: [],
						type: "Hospital",
					};
				} else {
					throw new Error("Incorrect data: some fields are missing");
				}

			case "OccupationalHealthcare":
				if ("employerName" in object) {
					return <NewEntry>{
						date: parseDate(object.date),
						description: parseDescription(object.description),
						specialist: parseSpecialist(object.specialist),
						diagnosisCodes:
							"diagnosisCodes" in object
								? parseDiagnosisCodes(object.diagnosisCodes)
								: [],
						employerName: parseEmployerName(object.employerName),
						sickLeave:
							"sickLeave" in object
								? parseSickLeave(object.sickLeave)
								: undefined,
						type: "OccupationalHealthcare",
					};
				} else {
					throw new Error("Incorrect data: some fields are missing");
				}
			case "HealthCheck":
				if ("healthCheckRating" in object) {
					return <NewEntry>{
						date: parseDate(object.date),
						description: parseDescription(object.description),
						specialist: parseSpecialist(object.specialist),
						diagnosisCodes:
							"diagnosisCodes" in object
								? parseDiagnosisCodes(object.diagnosisCodes)
								: [],
						healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
						type: "HealthCheck",
					};
				} else {
					throw new Error("Incorrect data: some fields are missing");
				}
			default:
				throw new Error("Incorrect data: entry type incorrect");
		}
	}

	throw new Error("Incorrect data: some fields are missing");
};

export default {
	toNewPatient,
	toNewEntry,
};

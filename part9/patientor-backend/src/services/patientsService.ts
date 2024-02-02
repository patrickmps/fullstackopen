import patients from "../data/patients";
import {
	PatientTypes,
	NonSensitivePatientTypes,
	NewPatientTypes,
} from "../types";
import { v1 as uuid } from "uuid";
const id = uuid();

const getPatients = (): PatientTypes[] => {
	return patients;
};

const findById = (id: string): PatientTypes | undefined => {
	return patients.find((p) => p.id === id);
};

const getNonSensitivePatients = (): NonSensitivePatientTypes[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addPatient = (patient: NewPatientTypes): PatientTypes => {
	const newPatient = {
		id,
		...patient,
	};

	patients.push(newPatient);

	return newPatient;
};

export default {
	getPatients,
	findById,
	getNonSensitivePatients,
	addPatient,
};

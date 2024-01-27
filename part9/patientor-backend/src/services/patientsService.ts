import patients from "../data/patients";
import { PatientTypes, NonSensitivePatientTypes } from "../types";

const getPatients = (): PatientTypes[] => {
	return patients;
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

export default {
	getPatients,
	getNonSensitivePatients,
};

export interface DiagnosesTypes {
	code: string;
	name: string;
	latin?: string;
}

export interface PatientTypes {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: string;
	occupation: string;
}

export type NonSensitivePatientTypes = Omit<PatientTypes, "ssn">;

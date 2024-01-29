export interface DiagnosesTypes {
	code: string;
	name: string;
	latin?: string;
}

export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other",
}

export interface PatientTypes {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
}

export type NonSensitivePatientTypes = Omit<PatientTypes, "ssn">;

export type NewPatientTypes = Omit<PatientTypes, "id">;

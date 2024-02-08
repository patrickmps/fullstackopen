export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other",
}

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3,
}

export enum EntryType {
	HealthCheck = "HealthCheck",
	Hospital = "Hospital",
	OccupationalHealthcare = "OccupationalHealthcare",
}

interface HealthCheckEntry extends BaseEntry {
	type: EntryType.HealthCheck;
	healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
	type: EntryType.Hospital;
	discharge: {
		date: string;
		criteria: string;
	};
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: EntryType.OccupationalHealthcare;
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	};
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

export interface PatientTypes {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
	entries?: Entry[];
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
	? Omit<T, K>
	: never;

export type PatientFormValues = Omit<PatientTypes, "id" | "entries">;

export type EntryFormValues = UnionOmit<Entry, "id">;

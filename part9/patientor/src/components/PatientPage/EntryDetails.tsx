import { Entry, EntryType } from "../../types";
import { HealthCheckEntry } from "./HealthCheckEntry";
import { HospitalEntry } from "./HospitalEntry";
import { OccupationalHealthcareEntry } from "./OccupationalHealthcareEntry";

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

export const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
	switch (entry.type) {
		case EntryType.Hospital:
			return <HospitalEntry entry={entry} />;
		case EntryType.OccupationalHealthcare:
			return <OccupationalHealthcareEntry entry={entry} />;
		case EntryType.HealthCheck:
			return <HealthCheckEntry entry={entry} />;
		default:
			return assertNever(entry);
	}
};

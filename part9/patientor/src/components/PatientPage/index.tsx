import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { EntryFormValues, PatientTypes } from "../../types";
import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import { EntryDetails } from "./EntryDetails";
import EntryForm from "./EntryForm";
import axios from "axios";

export const PatientPage = () => {
	const id = useParams().id;
	const [patient, setPatient] = useState<PatientTypes>();
	const [error, setError] = useState<string>();

	const submitNewEntry = async (values: EntryFormValues) => {
		try {
			const entry = await patientService.addEntry(id!, values);
			setPatient({ ...patient!, entries: patient?.entries?.concat(entry) });
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				if (e?.response?.data && typeof e?.response?.data === "string") {
					const message = e.response.data.replace(
						"Something went wrong. Error: ",
						""
					);
					console.error(message);
					setError(message);
				} else {
					setError("Unrecognized axios error");
				}
			} else {
				console.error("Unknown error", e);
				setError("Unknown error");
			}
		}
	};

	useEffect(() => {
		const fetchPatientList = async () => {
			if (id) {
				const patients = await patientService.getById(id);
				setPatient(patients);
			}
		};
		void fetchPatientList();
	}, []);

	return (
		<div>
			<Box>
				<Typography
					variant="h4"
					style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
				>
					{patient?.name}

					{patient?.gender === "female" && <FemaleIcon />}
					{patient?.gender === "male" && <MaleIcon />}
					{patient?.gender === "other" && <Diversity2Icon />}
				</Typography>
				<span>SSN: {patient?.ssn}</span>
				<br />
				<span>Occupation: {patient?.occupation}</span>

				<EntryForm
					onCancel={() => {}}
					onSubmit={submitNewEntry}
					error={error}
				/>

				<Typography
					variant="h6"
					style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
				>
					Entries
				</Typography>
				{patient?.entries?.map((e, index) => (
					<EntryDetails key={index} entry={e} />
				))}
			</Box>
		</div>
	);
};

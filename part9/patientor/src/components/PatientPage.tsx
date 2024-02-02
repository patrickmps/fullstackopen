import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import { Patient } from "../types";
import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import Diversity2Icon from "@mui/icons-material/Diversity2";

export const PatientPage = () => {
	const id = useParams().id;
	const [patient, setPatient] = useState<Patient>();

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
			</Box>
		</div>
	);
};

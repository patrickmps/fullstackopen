import {
	Card,
	CardContent,
	List,
	ListItemText,
	Typography,
} from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import diagnosesService from "../../services/diagnoses";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useEffect, useState } from "react";

export const HospitalEntry = ({ entry }: { entry: Entry }) => {
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

	useEffect(() => {
		const fetchDiagnoses = async () => {
			const result = await diagnosesService.getAll();
			setDiagnoses(result);
		};
		void fetchDiagnoses();
	}, []);

	if (entry.type !== "Hospital") {
		return null;
	}
	return (
		<Card sx={{ padding: 2, maxWidth: 600 }}>
			<Typography variant="h6">
				{entry.date} <LocalHospitalIcon />
			</Typography>
			<CardContent>
				{entry.description}
				<br />
				<List>
					{entry.diagnosisCodes?.map((d, index) => (
						<ListItemText key={index}>
							{d} -{" "}
							{diagnoses?.find((diagnosis) => diagnosis?.code === d)?.name}
						</ListItemText>
					))}
				</List>
				Discharge: {entry.discharge.date} - {entry.discharge.criteria}
				<br />
				Diagnose by {entry.specialist}
			</CardContent>
		</Card>
	);
};

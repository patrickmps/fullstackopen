import {
	Card,
	CardContent,
	List,
	ListItemText,
	Typography,
} from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import diagnosesService from "../../services/diagnoses";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { useEffect, useState } from "react";

export const OccupationalHealthcareEntry = ({ entry }: { entry: Entry }) => {
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

	useEffect(() => {
		const fetchDiagnoses = async () => {
			const result = await diagnosesService.getAll();
			setDiagnoses(result);
		};
		void fetchDiagnoses();
	}, []);

	if (entry.type !== "OccupationalHealthcare") {
		return null;
	}

	return (
		<Card sx={{ padding: 2, maxWidth: 600 }}>
			<Typography variant="h6">
				{entry.date} <MonitorHeartIcon /> {entry.employerName}
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
				{entry.sickLeave && (
					<>
						Sick Leave
						<ul>
							<li>Start: {entry.sickLeave?.startDate}</li>
							<li>End: {entry.sickLeave?.endDate}</li>
						</ul>
					</>
				)}
				Diagnose by {entry.specialist}
			</CardContent>
		</Card>
	);
};

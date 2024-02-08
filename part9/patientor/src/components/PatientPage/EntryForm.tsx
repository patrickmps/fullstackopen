import { useState, SyntheticEvent, useEffect } from "react";
import {
	TextField,
	InputLabel,
	MenuItem,
	Select,
	Grid,
	Button,
	Typography,
	Alert,
	SelectChangeEvent,
	Input,
} from "@mui/material";
import {
	Diagnosis,
	EntryFormValues,
	EntryType,
	HealthCheckRating,
} from "../../types";
import diagnosesService from "../../services/diagnoses";

interface EntryFormTypes {
	onCancel: () => void;
	onSubmit: (values: EntryFormValues) => void;
	error: string | undefined;
}

interface HealthCheckRatingOption {
	value: HealthCheckRating;
	label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(
	HealthCheckRating
)
	.filter((v) => isNaN(Number(v)))
	.map((v) => ({
		value: v as HealthCheckRating,
		label: v.toString(),
	}));

const EntryForm = ({ onCancel, onSubmit, error }: EntryFormTypes) => {
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
	const [type, setType] = useState(EntryType.HealthCheck);
	const [date, setDate] = useState("");
	const [description, setDescription] = useState("");
	const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
		HealthCheckRating.Healthy
	);
	const [specialist, setSpecialist] = useState("");
	const [diagnosis, setDiagnosis] = useState<string[]>([]);
	const [dischargeDate, setDischargeDate] = useState("");
	const [dischargeCriteria, setDischargeCriteria] = useState("");
	const [employerName, setEmployerName] = useState("");
	const [startSickLeave, setStartSickLeave] = useState("");
	const [endSickLeave, setEndSickLeave] = useState("");

	const addEntry = (event: SyntheticEvent) => {
		const healthCheckRatingValue: HealthCheckRating = (
			HealthCheckRating as never
		)[healthCheckRating];

		event.preventDefault();
		onSubmit({
			type: type,
			date: date,
			description: description,
			healthCheckRating: healthCheckRatingValue,
			specialist: specialist,
			diagnosisCodes: diagnosis,
			discharge: {
				date: dischargeDate,
				criteria: dischargeCriteria,
			},
			employerName: employerName,
			sickLeave: {
				startDate: startSickLeave,
				endDate: endSickLeave,
			},
		});
	};

	const clearFields = () => {
		onCancel();
		setDate("");
		setDescription("");
		setDiagnosis([]);
		setHealthCheckRating(HealthCheckRating.Healthy);
		setSpecialist("");
		setDischargeDate("");
		setDischargeCriteria("");
		setStartSickLeave("");
		setEndSickLeave("");
		setEmployerName("");
		setType(EntryType.HealthCheck);
	};

	const onDiagnosisChange = (event: SelectChangeEvent<typeof diagnosis>) => {
		const {
			target: { value },
		} = event;
		setDiagnosis(typeof value === "string" ? value.split(",") : value);
	};

	const onHealthCheckRatingChange = (
		event: SelectChangeEvent<HealthCheckRating>
	) => {
		event.preventDefault();
		if (typeof event.target.value === "string") {
			const value = event.target.value;
			const rating = Object.values(HealthCheckRating).find(
				(h) => h.toString() === value
			) as HealthCheckRating;
			if (rating) {
				setHealthCheckRating(rating);
			}
		}
	};

	const assertNever = (value: never): never => {
		throw new Error(
			`Unhandled discriminated union member: ${JSON.stringify(value)}`
		);
	};

	const typeFormFields = () => {
		switch (type) {
			case EntryType.Hospital:
				return (
					<>
						<InputLabel style={{ marginTop: 20 }}>Discharge Date</InputLabel>
						<Input
							placeholder="YYYY-MM-DD"
							type="date"
							fullWidth
							value={dischargeDate}
							onChange={({ target }) => setDischargeDate(target.value)}
						/>
						<InputLabel style={{ marginTop: 20 }}>
							Discharge Criteria
						</InputLabel>
						<TextField
							label="Discharge Criteria"
							fullWidth
							value={dischargeCriteria}
							onChange={({ target }) => setDischargeCriteria(target.value)}
						/>
					</>
				);
			case EntryType.OccupationalHealthcare:
				return (
					<>
						<InputLabel style={{ marginTop: 20 }}>Employer Name</InputLabel>
						<TextField
							label="Employer Name"
							fullWidth
							value={employerName}
							onChange={({ target }) => setEmployerName(target.value)}
						/>
						<InputLabel style={{ marginTop: 20 }}>
							Sick Leave Start Date
						</InputLabel>
						<Input
							placeholder="YYYY-MM-DD"
							type="date"
							fullWidth
							value={startSickLeave}
							onChange={({ target }) => setStartSickLeave(target.value)}
						/>
						<InputLabel style={{ marginTop: 20 }}>
							Sick Leave End Date
						</InputLabel>
						<Input
							placeholder="YYYY-MM-DD"
							type="date"
							fullWidth
							value={endSickLeave}
							onChange={({ target }) => setEndSickLeave(target.value)}
						/>
					</>
				);
			case EntryType.HealthCheck:
				return (
					<>
						<InputLabel style={{ marginTop: 20 }}>
							Health Check Rating
						</InputLabel>
						<Select
							label="Health Check Rating"
							fullWidth
							value={healthCheckRating}
							onChange={onHealthCheckRatingChange}
						>
							{healthCheckRatingOptions.map((option) => (
								<MenuItem key={option.label} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
					</>
				);
			default:
				return assertNever(type);
		}
	};

	useEffect(() => {
		const fetchDiagnoses = async () => {
			const result = await diagnosesService.getAll();
			setDiagnoses(result);
		};
		void fetchDiagnoses();
	}, []);

	return (
		<div style={{ marginBottom: "5em" }}>
			<Typography variant="h6" sx={{ marginBottom: 1.5, marginTop: 1.5 }}>
				{" "}
				New Health Check Entry
			</Typography>
			{error && <Alert severity="error">{error}</Alert>}
			<form onSubmit={addEntry}>
				<InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
				<Input
					placeholder="YYYY-MM-DD"
					type="date"
					fullWidth
					value={date}
					onChange={({ target }) => setDate(target.value)}
				/>
				<InputLabel style={{ marginTop: 20 }}>Description</InputLabel>
				<TextField
					label="Description"
					fullWidth
					value={description}
					onChange={({ target }) => setDescription(target.value)}
				/>
				<InputLabel style={{ marginTop: 20 }}>Specialist</InputLabel>
				<TextField
					label="Specialist"
					fullWidth
					value={specialist}
					onChange={({ target }) => setSpecialist(target.value)}
				/>

				<InputLabel style={{ marginTop: 20 }}>Diagnosis Codes</InputLabel>
				<Select
					label="Diagnosis"
					labelId="demo-multiple-checkbox-label"
					id="demo-multiple-checkbox"
					fullWidth
					multiple
					value={diagnosis}
					renderValue={(selected) => selected.join(", ")}
					onChange={onDiagnosisChange}
				>
					{diagnoses?.map((d) => (
						<MenuItem key={d.code} value={d.code}>
							{d.code} - {d.name}
						</MenuItem>
					))}
				</Select>

				<InputLabel style={{ marginTop: 20 }}>Entry Type</InputLabel>
				<Select
					label="Type"
					fullWidth
					value={type}
					onChange={({ target }) => setType(target.value as EntryType)}
				>
					{Object.values(EntryType).map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</Select>

				{typeFormFields()}

				<Grid marginTop={2}>
					<Grid item>
						<Button
							color="secondary"
							variant="contained"
							style={{ float: "left" }}
							type="button"
							onClick={clearFields}
						>
							Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button
							style={{
								float: "right",
							}}
							type="submit"
							variant="contained"
						>
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default EntryForm;

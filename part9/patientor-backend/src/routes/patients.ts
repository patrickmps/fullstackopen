/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientsService from "../services/patientsService";
import entriesService from "../services/entriesService";

const router = express.Router();

router.get("/", (_req, res) => {
	res.send(patientsService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
	res.send(patientsService.findById(req.params.id));
});

router.post("/:id/entries", (req, res) => {
	const {
		date,
		description,
		specialist,
		diagnosisCodes,
		type,
		healthCheckRating,
		discharge,
		employerName,
		sickLeave,
	} = req.body;

	res.send(
		entriesService.addEntry({
			entry: {
				date,
				description,
				specialist,
				diagnosisCodes,
				type,
				healthCheckRating,
				discharge,
				employerName,
				sickLeave,
			},
			patientId: req.params.id,
		})
	);
});

router.post("/", (req, res) => {
	const { name, dateOfBirth, ssn, gender, occupation, entries } = req.body;

	const addedPatient = patientsService.addPatient({
		name,
		dateOfBirth,
		gender,
		occupation,
		ssn,
		entries,
	});

	return res.json(addedPatient);
});

export default router;

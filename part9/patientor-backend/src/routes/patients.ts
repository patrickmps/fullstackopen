import express from "express";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
	res.send(patientsService.getNonSensitivePatients());
});

export default router;

import diagnoses from "../data/diagnoses";
import { DiagnosesTypes } from "../types";

const getDiagnoses = (): DiagnosesTypes[] => {
	return diagnoses;
};

export default {
	getDiagnoses,
};

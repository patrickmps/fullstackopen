import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { isNotNumber } from "./utils";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
	return res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
	const { height, weight } = req.query;

	if (!height || !weight) {
		return res.status(400).json({ error: "Weight or age were not provided." });
	}

	const result = calculateBmi(Number(height), Number(weight));

	return res.json({
		weight,
		height,
		bmi: result,
	});
});

app.post("/exercises", (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = req.body;

	if (!daily_exercises || !target) {
		return res.status(400).json({ error: "parameters missing" });
	}

	if (isNotNumber(target)) {
		return res.status(400).json({ error: "malformatted parameters" });
	}

	if (daily_exercises instanceof Array) {
		for (let i = 0; i < daily_exercises.length; i++) {
			if (isNotNumber(daily_exercises[i])) {
				return res.status(400).json({ error: "malformatted parameters" });
			}
		}
	}

	const result = calculateExercises(
		daily_exercises as number[],
		Number(target)
	);

	return res.json(result);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

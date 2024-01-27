interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

export const calculateExercises = (
	dailyHours: number[],
	targetHours: number
): Result => {
	const result: Result = {
		periodLength: dailyHours.length,
		trainingDays: dailyHours.filter((h) => h > 0).length,
		success: false,
		rating: 0,
		ratingDescription: "",
		target: targetHours,
		average: 0,
	};

	result.average =
		dailyHours.reduce((sumHours, dHours) => sumHours + dHours, 0) /
		dailyHours.length;

	result.success = result.average > targetHours ? true : false;

	if (result.average < targetHours - 1) {
		result.rating = 1;
		result.ratingDescription =
			"You didn't do well. Don't get discouraged, you can reach your goal!";
	} else if (result.average < targetHours) {
		result.rating = 1.5;
		result.ratingDescription = "Not too bad, but could be better.";
	} else if (
		result.average >= targetHours &&
		result.average < targetHours + 1
	) {
		result.rating = 2;
		result.ratingDescription = "Well done, you reached the goal!!";
	} else {
		result.rating = 3;
		result.ratingDescription =
			"You were exceptional!! You can increase the target for the next objectives.";
	}

	return result;
};

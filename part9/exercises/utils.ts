export const isNotNumber = (argument: unknown): boolean =>
	isNaN(Number(argument));

interface MultiplyValues {
	value1: number;
	value2: number[];
}

export const parseArguments = (args: string[]): MultiplyValues => {
	if (args.length < 4) throw new Error("Not enough arguments");

	const numbers: number[] = [];

	for (let i = 3; i < args.length; i++) {
		const element = args[i];
		if (isNotNumber(element)) {
			throw new Error("Provided values were not numbers!");
		}

		numbers.push(Number(element));
	}
	return {
		value1: Number(args[2]),
		value2: numbers,
	};
};

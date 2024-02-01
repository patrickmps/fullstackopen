import { CoursePart } from "../App";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

type PartTypes = { part: CoursePart };

export const Part = ({ part }: PartTypes) => {
	const kindCheck = () => {
		switch (part.kind) {
			case "basic":
				return (
					<div>
						<h3>
							{part.name} {part.exerciseCount}
						</h3>
						{part.description}
					</div>
				);

			case "group":
				return (
					<div>
						<h3>
							{part.name} {part.exerciseCount}
						</h3>
						{part.groupProjectCount}
					</div>
				);

			case "background":
				return (
					<div>
						<h3>
							{part.name} {part.exerciseCount}
						</h3>
						{part.description} <br />
						{part.backgroundMaterial}
					</div>
				);

			case "special":
				return (
					<div>
						<h3>
							{part.name} {part.exerciseCount}
						</h3>
						{part.description} <br />
						{part.requirements.join(", ")}
					</div>
				);

			default:
				return assertNever(part);
		}
	};

	return kindCheck();
};

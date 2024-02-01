import { CoursePart } from "../App";
import { Part } from "./Part";

type ContentTypes = { content: CoursePart[] };

export const Content = ({ content }: ContentTypes) => {
	return (
		<>
			{content.map((part, index) => (
				<Part part={part} key={index} />
			))}
		</>
	);
};

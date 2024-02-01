interface TotalTypes {
	total: number;
}

export const Total = ({ total }: TotalTypes) => {
	return <p>Number of exercises {total}</p>;
};

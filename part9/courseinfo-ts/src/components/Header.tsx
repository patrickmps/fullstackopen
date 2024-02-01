interface HeaderTypes {
	title: string;
}

export const Header = ({ title }: HeaderTypes) => {
	return <h1>{title}</h1>;
};

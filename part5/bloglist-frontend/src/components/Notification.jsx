export const Notification = ({ message }) => {
	if (message === null) {
		return null;
	}

	const style = {
		color: message.success ? "green" : "red",
		background: "lightgrey",
		fontSize: "20px",
		borderStyle: "solid",
		borderRadius: "5px",
		padding: "10px",
		marginBottom: "10px",
	};

	return (
		<div style={style} className="notification">
			{message.text}
		</div>
	);
};

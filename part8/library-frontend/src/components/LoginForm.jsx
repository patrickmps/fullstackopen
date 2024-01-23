import { useEffect } from "react";
import { useField } from "../hooks";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

export const LoginForm = ({ setToken, setError }) => {
	const username = useField("text", "username");
	const password = useField("password", "password");

	const [login, result] = useMutation(LOGIN, {
		onError: (error) => {
			setError(error.graphQLErrors[0].message);
		},
	});

	const handleSubmit = async (event) => {
		event.preventDefault();

		login({
			variables: { username: username.value, password: password.value },
		});
	};

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value;
			setToken(token);
			localStorage.setItem("library-user-token", token);
		}
	}, [result.data]);

	return (
		<div>
			<h2>Login</h2>

			<form onSubmit={handleSubmit}>
				<div>
					username
					<input {...username} />
				</div>
				<div>
					password
					<input {...password} />
				</div>
				<button type="submit" id="login-button">
					login
				</button>
			</form>
		</div>
	);
};

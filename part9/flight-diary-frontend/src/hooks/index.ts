import React, { useState } from "react";

interface FieldTypes {
	type: string;
	name?: string;
	placeholder?: string;
}

export const useField = ({ type, name, placeholder }: FieldTypes) => {
	const [value, setValue] = useState("");
	const onChange = (event: React.FormEvent<HTMLInputElement>) => {
		const element = event.target as HTMLInputElement;
		setValue(element.value);
	};

	const onReset = () => {
		setValue("");
	};

	return {
		type,
		value,
		onChange,
		onReset,
		name,
		placeholder,
	};
};

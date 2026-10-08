import type { HTMLInputTypeAttribute } from "react";
import { usePasswordStore } from "#/shared/store";

type Inputs = HTMLInputTypeAttribute | undefined;

const usePassword = (type: Inputs) => {
	const { password, setPassword } = usePasswordStore();

	const isPassword = type === "password";
	const inputType = isPassword && password ? "text" : type;

	const handleShowPw = () => {
		setPassword(!password);
	};

	return { inputType, isPassword, password, handleShowPw };
};

export { usePassword };

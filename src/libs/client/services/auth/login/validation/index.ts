import { schema } from "#/libs/shared/validations/index.ts";

const login = (data: unknown) => {
	const validateData = schema.login.safeParse(data);

	if (!validateData.success) {
		throw new Error("invalid data");
	}

	return validateData.data;
};

export const validate = {
	login,
};

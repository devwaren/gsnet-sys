import { schema } from "#/libs/shared/validations/index.ts";

const register = (data: unknown) => {
	const validateData = schema.register.safeParse(data);

	if (!validateData.success) {
		throw new Error("invalid data");
	}

	return validateData.data;
};

export const validate = {
	register,
};

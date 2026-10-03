import { schema } from "#/libs/shared/validations/index.ts";

const email = async (data: unknown) => {
	const validateData = schema.email.safeParse(data);

	if (!validateData.success) {
		throw new Error("invalid email");
	}

	return validateData.data;
};

export const validate = {
	email,
};

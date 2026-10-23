import { schema } from "#/libs/shared/schema";

const email = async (data: unknown) => {
	const validateData = schema.auth.email.safeParse(data);

	if (!validateData.success) {
		throw new Error("invalid email");
	}

	return validateData.data;
};

export const validate = {
	email,
};

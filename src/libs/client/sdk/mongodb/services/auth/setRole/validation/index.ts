import { schema } from "#/libs/shared/validations";

const setRole = async (data: unknown) => {
	const result = schema.admin.token.safeParse(data);

	if (!result.success) return;

	return result.data;
};

export const validate = {
	setRole,
};

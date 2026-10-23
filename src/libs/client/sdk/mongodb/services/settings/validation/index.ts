import { schema } from "#/libs/shared/schema";

const resetPassword = async (data: unknown) => {
	const result = schema.auth.resetPassword.safeParse(data);

	if (!result.success) return;

	return result.data;
};

export const validate = { resetPassword };

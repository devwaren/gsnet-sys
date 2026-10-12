import { schemaServer } from "#/libs/server/validations";

const jwt = async (data: unknown) => {
	const result = schemaServer.jwt.safeParse(data);

	if (!result.success) return;

	return result.data;
};

export const validate = {
	jwt,
};

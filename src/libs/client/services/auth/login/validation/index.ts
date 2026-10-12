import { server } from "#/libs/server/utils";
import { schema } from "#/libs/shared/validations";

const login = (data: unknown) => {
	const result = schema.auth.login.safeParse(data);

	if (!result.success) {
		server.log("[validation] Failed", result.error);
		return null;
	}

	server.log("[validation] Success!");

	return result.data;
};

export const validate = {
	login,
};

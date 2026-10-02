import { schema } from "#/libs/shared/validations";
import { collection } from "../config";

export const collections = {
	users: collection({
		name: "users",
		schema: schema.profile,
	}),
	sessions: collection({
		name: "sessions",
		schema: schema.sessions,
	}),
};

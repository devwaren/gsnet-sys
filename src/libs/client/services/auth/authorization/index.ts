import { createServerFn } from "@tanstack/react-start";
import { mongoSDK } from "#/libs/server/sdk/mongodb";

export const getAuthorization = createServerFn({ method: "POST" }).handler(
	async () => {
		return await mongoSDK.services.auth.authorization();
	},
);

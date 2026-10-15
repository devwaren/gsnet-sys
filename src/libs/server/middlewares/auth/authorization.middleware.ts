import { createMiddleware } from "@tanstack/react-start";
import { mongoSDK } from "#/libs/server/sdk/mongodb";

export const authorization = createMiddleware().server(
	async ({ request, next }) => {
		if (request.method !== "POST") {
			return next();
		}

		await mongoSDK.services.auth.checkAdmin();

		return next();
	},
);

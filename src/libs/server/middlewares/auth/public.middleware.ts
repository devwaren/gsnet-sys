import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { mongoSDK } from "#/libs/server/sdk/mongodb";

export const publicRoute = createMiddleware().server(async ({ next }) => {
	const session = await mongoSDK.services.auth.session();

	if (session) {
		throw redirect({ to: "/dashboard" });
	}

	return next({
		context: { session: null },
	});
});

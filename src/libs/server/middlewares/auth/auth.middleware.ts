import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { mongoSDK } from "#/libs/server/sdk/mongodb";

export const auth = createMiddleware().server(async ({ next }) => {
	const session = await mongoSDK.services.auth.getSession();

	if (!session) {
		throw redirect({ to: "/auth/login" });
	}

	return next({
		context: {
			session,
		},
	});
});

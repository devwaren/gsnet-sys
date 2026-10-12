import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { decryptUserId } from "#/libs/server/gen/tokens";
import { mongoSDK } from "#/libs/server/sdk/mongodb";

export const role = createMiddleware().server(async ({ next }) => {
	const session = await mongoSDK.services.auth.session();

	if (!session) {
		throw redirect({ to: "/" });
	}

	const userId = decryptUserId(session.hashSnake);

	const userRole = await mongoSDK.services.auth.getUserRole(userId);

	if (userRole !== "admin") {
		throw redirect({ to: "/dashboard" });
	}

	return next({
		context: { session, role: userRole },
	});
});

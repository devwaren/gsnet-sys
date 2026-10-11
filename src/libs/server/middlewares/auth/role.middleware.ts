import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { mongoSDK } from "../../sdk/mongodb";

export const role = createMiddleware().server(async ({ next }) => {
	const session = await mongoSDK.services.auth.getSession();

	if (!session) {
		throw redirect({ to: "/" });
	}

	const userRole = await mongoSDK.services.auth.getRole({
		data: session.userId,
	});

	if (userRole !== "admin") {
		throw redirect({ to: "/dashboard" });
	}

	return next({
		context: { session, role: userRole },
	});
});

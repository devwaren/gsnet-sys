import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import { mongoSDK } from "#/libs/server/sdk/mongodb";

export const publicRoute = createMiddleware().server(async ({ next }) => {
	const session = await mongoSDK.services.auth.session();

	if (!session) {
		setCookie("session_token", "", {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			partitioned: true,
			priority: "high",
			maxAge: 0,
			expires: new Date(0),
		});
	}

	if (session) {
		throw redirect({ to: "/dashboard" });
	}

	return next({
		context: { session: null },
	});
});

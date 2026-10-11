import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import { mongoSDK } from "#/libs/server/sdk/mongodb";

const clearSessionCookie = () =>
	setCookie("session_token", "", {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		partitioned: true,
		path: "/",
		maxAge: 0,
	});

export const auth = createMiddleware().server(async ({ next }) => {
	const session = await mongoSDK.services.auth.getSession();

	if (!session) {
		clearSessionCookie();
		throw redirect({ to: "/" });
	}

	const isExpired = new Date(session.expiresAt).getTime() <= Date.now();

	if (isExpired) {
		clearSessionCookie();
		throw redirect({ to: "/" });
	}

	return next({
		context: {
			session,
		},
	});
});

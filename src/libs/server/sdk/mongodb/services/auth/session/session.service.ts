import { createServerOnlyFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { collections } from "#/libs/server/sdk/mongodb/collections";

export const session = createServerOnlyFn(async () => {
	const sessionToken = getCookie("session_token");

	if (!sessionToken) return null;

	const currentSession = await collections.sessions.findOne(
		{ token: sessionToken },
		{
			sessionId: 1,
			userId: 1,
			expiresAt: 1,
		},
	);

	const clearSessionCookie = () => {
		setCookie("session_token", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 0,
		});
	};

	if (!currentSession || currentSession.expiresAt <= new Date()) {
		clearSessionCookie();
		return null;
	}

	return {
		sessionId: currentSession.sessionId,
		userId: currentSession.userId,
		expiresAt: currentSession.expiresAt,
	};
});

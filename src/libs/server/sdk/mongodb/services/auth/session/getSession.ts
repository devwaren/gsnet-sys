import { createServerOnlyFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { collections } from "../../../collections";

export const getSession = createServerOnlyFn(async () => {
	const sessionCookie = getCookie("session_token");

	if (!sessionCookie) return null;

	const findSession = await collections.sessions.findOne(
		{ token: sessionCookie },
		{
			sessionId: 1,
			userId: 1,
			expiresAt: 1,
		},
	);

	if (!findSession) {
		setCookie("session_token", "", {
			maxAge: 0,
			path: "/",
		});

		return null;
	}

	if (findSession.expiresAt <= new Date()) {
		setCookie("session_token", "", {
			maxAge: 0,
			path: "/",
		});

		return null;
	}

	return {
		sessionId: findSession.sessionId,
		userId: findSession.userId,
		expiresAt: findSession.expiresAt,
	};
});

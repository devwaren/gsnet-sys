import { createServerOnlyFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { ObjectId } from "mongodb";
import { encryptUserId } from "#/libs/server/gen/tokens";
import { collections } from "#/libs/server/sdk/mongodb/collections";

export const session = createServerOnlyFn(async () => {
	const clearSessionCookie = () => {
		setCookie("session_token", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 0,
			expires: new Date(0),
		});
	};

	const sessionToken = getCookie("session_token");

	if (!sessionToken) return null;

	const currentSession = await collections.sessions.findOne(
		{ token: sessionToken },
		{ userId: 1, expiresAt: 1 },
	);

	if (!currentSession) {
		clearSessionCookie();
		return null;
	}

	const expiresAt = new Date(currentSession.expiresAt);

	if (
		!Number.isFinite(expiresAt.getTime()) ||
		expiresAt.getTime() <= Date.now()
	) {
		await collections.sessions.deleteOne({ token: sessionToken });
		clearSessionCookie();
		return null;
	}

	const userId = currentSession.userId?.toString();

	if (!userId || !ObjectId.isValid(userId)) {
		await collections.sessions.deleteOne({ token: sessionToken });
		clearSessionCookie();
		return null;
	}

	const user = await collections.users.findOne(
		{ _id: new ObjectId(userId) },
		{ _id: 1 },
	);

	if (!user) {
		await collections.sessions.deleteOne({ token: sessionToken });
		clearSessionCookie();
		return null;
	}

	return {
		hashSnake: encryptUserId(userId),
		expiresAt: expiresAt.toISOString(),
	};
});

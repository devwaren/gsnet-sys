import { createServerOnlyFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { ObjectId } from "mongodb";
import { collections } from "#/libs/server/sdk/mongodb/collections";

export const profile = createServerOnlyFn(async () => {
	const clearSessionCookie = () => {
		setCookie("session_token", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 0,
		});
	};

	const sessionToken = getCookie("session_token");

	if (!sessionToken) return null;

	const session = await collections.sessions.findOne(
		{ token: sessionToken },
		{ userId: 1, expiresAt: 1 },
	);

	if (!session?.expiresAt) {
		clearSessionCookie();
		return null;
	}

	const expiresAt = new Date(session.expiresAt);

	if (
		!Number.isFinite(expiresAt.getTime()) ||
		expiresAt.getTime() <= Date.now()
	) {
		clearSessionCookie();
		return null;
	}

	const userId = session.userId?.toString();

	if (!userId || !ObjectId.isValid(userId)) {
		clearSessionCookie();
		return null;
	}

	const user = await collections.users.findOne(
		{ _id: new ObjectId(userId) },
		{
			firstName: 1,
			lastName: 1,
			email: 1,
			avatar: 1,
		},
	);

	if (!user) {
		clearSessionCookie();
		return null;
	}

	return {
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		avatar: user.avatar ?? null,
	};
});

import { createServerOnlyFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import { ObjectId } from "mongodb";
import { collections } from "#/libs/server/sdk/mongodb/collections";

const logout = createServerOnlyFn(async ({ request }: { request: Request }) => {
	const cookieHeader = request.headers.get("cookie");

	const sessionToken = cookieHeader
		?.split(";")
		.map((cookie) => cookie.trim())
		.find((cookie) => cookie.startsWith("session_token="))
		?.slice("session_token=".length);

	if (!sessionToken) {
		return Response.json(
			{ success: false, message: "Session token is missing." },
			{ status: 401 },
		);
	}

	const session = await collections.sessions.findOne({
		token: sessionToken,
	});

	if (!session) {
		return Response.json(
			{ success: false, message: "Session not found." },
			{ status: 401 },
		);
	}

	const objUserId = new ObjectId(session.userId);

	const csrf = await collections.tokens.findOne(
		{
			userId: objUserId,
		},
		{
			userId: 1,
			token: 1,
			expireAt: 1,
		},
	);

	// Delete the session's CSRF token.
	if (csrf?.token) {
		await collections.tokens.deleteOne({
			token: csrf.token,
		});
	}

	// Revoke the session.
	await collections.sessions.deleteOne({
		token: sessionToken,
	});

	setCookie("session_token", "", {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		partitioned: true,
		path: "/",
		maxAge: 0,
		priority: "high",
	});

	return Response.json({
		success: true,
		message: "Logged out successfully.",
	});
});

export { logout };

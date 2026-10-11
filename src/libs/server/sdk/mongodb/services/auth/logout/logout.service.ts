import { createServerOnlyFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
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

	const deletedSession = await collections.sessions.deleteOne({
		token: sessionToken,
	});

	if (!deletedSession) {
		return Response.json(
			{ success: false, message: "Session not found." },
			{ status: 401 },
		);
	}

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

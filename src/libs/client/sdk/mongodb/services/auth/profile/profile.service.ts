import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { httpClient } from "#/libs/client/http";
import { invalid } from "#/libs/server/res";
import { validate } from "./validation";

const clearSessionCookie = () => {
	setCookie("session_token", "", {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		path: "/",
		maxAge: 0,
		expires: new Date(0),
		priority: "high",
	});
};

export const profile = createServerFn({ method: "GET" }).handler(async () => {
	const sessionId = getCookie("session_token");

	if (!sessionId) {
		clearSessionCookie();
	}

	const result = validate.jwt(sessionId);

	if (!result) return invalid();

	const res = await httpClient({
		url: "/api/v1/profile",
		method: "GET",
		headers: {
			Cookie: `session_token=${sessionId}`,
		},
	});

	return Response.json(res.data);
});

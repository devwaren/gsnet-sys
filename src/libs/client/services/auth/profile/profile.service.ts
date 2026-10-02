import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { httpClient } from "#/libs/client/http";

export const profile = createServerFn({ method: "GET" }).handler(async () => {
	const sessionId = getCookie("session_token");

	const res = await httpClient({
		url: "/api/v1/profile",
		method: "GET",
		headers: {
			Cookie: `session_token=${sessionId}`,
		},
	});

	return Response.json(res.data);
});

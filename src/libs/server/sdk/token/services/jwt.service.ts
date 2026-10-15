import { randomUUID } from "node:crypto";
import { setEnv } from "@dev-waren/mongodb";
import { createServerOnlyFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { SignJWT } from "jose";
import { http } from "#/libs/server/constants";
import { collections } from "../../mongodb/collections";

const invalidPerms = () =>
	Response.json({
		success: false,
		message: "invalid permission.",
		statusText: http.responses.status[401],
	});

const invalidSession = () =>
	Response.json(
		{
			success: false,
			message: "invalid session.",
			statusText: http.responses.status[401],
		},
		{
			status: 401,
		},
	);

export const getJWT = createServerOnlyFn(async () => {
	const sessionToken = getCookie("session_token");

	if (!sessionToken) return invalidSession();

	const account = await collections.sessions.findOne(
		{
			token: sessionToken,
		},
		{
			token: 1,
			userId: 1,
		},
	);

	if (!account) return invalidPerms();

	const user = await collections.roles.findOne(
		{
			userId: account.userId,
		},
		{
			userId: 1,
			role: 1,
		},
	);

	if (user?.role !== "admin") return invalidPerms();

	const secret = setEnv("JWT_SECRET");

	if (!secret) {
		throw new Error("JWT_SECRET is not configured");
	}

	const secretKey = new TextEncoder().encode(secret);

	const token = await new SignJWT({
		purpose: "generated-token",
	})
		.setProtectedHeader({ alg: "HS256", typ: "JWT" })
		.setJti(randomUUID())
		.setIssuedAt()
		.setExpirationTime("15m")
		.sign(secretKey);

	return Response.json(
		{
			success: true,
			message: "successfully retrieve the token.",
			statusText: http.responses.status[200],
			token,
		},
		{
			status: 200,
		},
	);
});

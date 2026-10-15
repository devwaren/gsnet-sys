import { createServerOnlyFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { http } from "#/libs/server/constants";
import { invalid } from "#/libs/server/res";
import { collections } from "#/libs/server/sdk/mongodb/collections";
import { schema } from "#/libs/shared/validations";

export const setRole = createServerOnlyFn(async ({ request }) => {
	const body = await request.json();
	const sessionToken = getCookie("session_token");

	const session = await collections.sessions.findOne(
		{
			token: sessionToken,
		},
		{
			token: 1,
			userId: 1,
		},
	);

	if (!session) {
		return Response.json({
			success: false,
			message: "invalid session",
			statusText: http.responses.status[401],
		});
	}

	const checkRole = await collections.roles.findOne(
		{
			userId: session.userId,
		},
		{
			userId: 1,
			role: 1,
		},
	);

	if (!checkRole) {
		return Response.json(
			{
				success: false,
				message: "invalid permission.",
				statusText: http.responses.status[401],
			},
			{
				status: 401,
			},
		);
	}

	if (checkRole.role !== "admin") {
		return Response.json(
			{
				success: false,
				message: "invalid permission.",
				statusText: http.responses.status[401],
			},
			{
				status: 401,
			},
		);
	}

	const { email } = body;

	const result = schema.admin.token.safeParse(body);

	if (!result.success) return invalid();

	const checkEmail = await collections.accounts.findOne(
		{
			email,
		},
		{
			email: 1,
		},
	);

	if (checkEmail) {
		return Response.json({
			success: false,
			message: "email already registered.",
			statusText: http.responses.status[409],
		});
	}

	await collections.registration.create(result.data);

	return Response.json(
		{
			success: true,
			message: "successfully assigned token",
			statusText: http.responses.status[200],
		},
		{
			status: 201,
		},
	);
});

import { createServerOnlyFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { http } from "#/libs/server/constants";
import { invalid } from "#/libs/server/res";
import { collections } from "#/libs/server/sdk/mongodb/collections";
import { validate } from "#/libs/shared/validation";

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

export const add = createServerOnlyFn(async ({ request }) => {
	const token = getCookie("session_token");

	const body = await request.json();

	const result = await validate.billing.invoices(body);

	if (!result.success) {
		return invalid();
	}

	// if token is undefined returning invalid

	if (!token) return invalidSession();

	const sessions = await collections.sessions.findOne(
		{ token },
		{
			token: 1,
			userId: 1,
			expiresAt: 1,
		},
	);

	if (!sessions) return invalidSession();

	// Check session expiration
	if (!sessions.expiresAt || sessions.expiresAt.getTime() <= Date.now()) {
		await collections.sessions.deleteOne({ token });

		return invalidSession();
	}

	// check the roles

	const userRole = await collections.roles.findOne(
		{
			userId: sessions.userId,
		},
		{
			userId: 1,
			role: 1,
		},
	);

	if (userRole?.role !== "admin" && userRole?.role !== "staff") {
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

	// creating invoices

	const createInvoices = await collections.invoices.create(result.data);

	if (!createInvoices) {
		return Response.json(
			{
				success: false,
				message: "failed to create invoices.",
				statusText: http.responses.status[400],
			},
			{
				status: 400,
			},
		);
	}

	return Response.json(
		{
			success: true,
			message: "invoice successfully created.",
			statusText: http.responses.status[200],
		},
		{
			status: 200,
		},
	);
});

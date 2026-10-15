import { createServerOnlyFn } from "@tanstack/react-start";
import bcrypt from "bcryptjs";
import { http } from "#/libs/server/constants";
import { invalid } from "#/libs/server/res";
import { collections } from "#/libs/server/sdk/mongodb/collections";
import type { AuthFn } from "#/libs/server/types";
import { unauthorizedlogin } from "./res";
import { genCSRF, session } from "./utils";
import { validate } from "./validation";

export const login = createServerOnlyFn<AuthFn>(async ({ request }) => {
	const body = await request.json();
	const validateData = validate.login(body);

	// validate incoming data

	if (!validateData) return invalid();

	const { email, password } = validateData;

	// Find user
	const user = await collections.users.findOne({ email }, { _id: 1, email: 1 });

	if (!user?._id) return unauthorizedlogin();

	// Find account credentials
	const account = await collections.accounts.findOne(
		{ userId: user._id },
		{ userId: 1, password: 1 },
	);

	if (!account) return unauthorizedlogin();

	// Verify password
	const passwordValid = await bcrypt.compare(password, account.password);

	if (!passwordValid) return unauthorizedlogin();

	// Generate session data
	const sessions = await session.create({ request });

	// Persist session
	await collections.sessions.create({
		...sessions,
		userId: user._id.toString(),
	});

	await genCSRF(user._id);

	return Response.json(
		{
			message: http.responses.messages.loggedIn,
			statusText: http.responses.status[200],
		},
		{
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Set-Cookie": [
					`session_token=${sessions.token}`,
					"Path=/",
					"HttpOnly",
					"SameSite=Lax",
					`Expires=${sessions.expiresAt.toUTCString()}`,
					"Secure",
				].join("; "),
			},
		},
	);
});

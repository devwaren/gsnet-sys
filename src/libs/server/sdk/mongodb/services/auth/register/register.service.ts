import { createServerOnlyFn } from "@tanstack/react-start";
import bcrypt from "bcryptjs";
import { http } from "#/libs/server/constants";
import { invalid } from "#/libs/server/res";
import { collections } from "#/libs/server/sdk/mongodb/collections";
import type { AuthFn } from "#/libs/server/types";
import { emailExists, registerFailed, successful } from "./res";
import { validate } from "./validation";

const register = createServerOnlyFn<AuthFn>(async ({ request }) => {
	const body = await request.json();

	const users = collections.users;

	const result = validate.register(body);

	if (!result) return invalid();

	const { email, token, password, confirmPassword, username, ...data } = result;

	const findToken = await collections.registration.findOne(
		{
			email,
			token,
		},
		{
			email: 1,
			token: 1,
			role: 1,
		},
	);

	if (!findToken) {
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

	const isEmailExists = await users.findOne(
		{
			email,
		},
		{
			email: 1,
		},
	);

	if (isEmailExists) return emailExists();

	const createUser = await users.create({
		email,
		...data,
	});

	if (!createUser) return registerFailed();

	const hashpassword = await bcrypt.hash(password, 10);

	await collections.accounts.create({
		userId: createUser._id,
		password: hashpassword,
		username,
	});

	const userId = String(createUser._id);

	await collections.roles.create({
		userId,
		role: findToken.role,
	});

	await collections.registration.deleteOne({
		token,
	});

	return successful();
});

export { register };

import { createServerOnlyFn } from "@tanstack/react-start";
import { invalid } from "#/libs/server/res";
import { collections } from "#/libs/server/sdk/mongodb/collections";
import type { AuthFn } from "#/libs/server/types";
import { emailExists, registerFailed, successful } from "./res";
import { validate } from "./validation";

const register = createServerOnlyFn<AuthFn>(async ({ request }) => {
	const body = await request.json();

	const users = collections.users;

	const validatedData = validate.register(body);

	if (!validatedData) return invalid();

	const { email, ...data } = validatedData;

	const isEmailExists = await users.findOne(
		{
			email,
		},
		{
			email: 1, // only return the email field
		},
	);

	if (isEmailExists) return emailExists();

	const createUser = await users.create({
		email,
		...data,
	});

	if (!createUser) return registerFailed();

	return successful();
});

export { register };

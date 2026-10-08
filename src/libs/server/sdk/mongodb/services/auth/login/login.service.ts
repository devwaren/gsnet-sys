import { createServerOnlyFn } from "@tanstack/react-start";
import bcrypt from "bcryptjs";
import { invalid } from "#/libs/server/res";
import { collections } from "#/libs/server/sdk/mongodb/collections";
import type { AuthFn } from "#/libs/server/types";
import { successful, unauthorizedlogin } from "./res";
import { validate } from "./validation";

export const login = createServerOnlyFn<AuthFn>(async ({ request }) => {
	const body = await request.json();

	const validateData = validate.login(body);

	if (!validateData) return invalid();

	const { email, password } = validateData;

	const user = await collections.users.findOne({
		email,
	});

	if (!user) return unauthorizedlogin();

	const account = await collections.accounts.findOne({
		userId: user._id,
	});

	if (!account) return unauthorizedlogin();

	const passwordValid = await bcrypt.compare(password, account.password);

	if (!passwordValid) return unauthorizedlogin();

	return successful();
});

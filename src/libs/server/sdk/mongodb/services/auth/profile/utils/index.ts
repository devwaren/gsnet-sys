import { createServerOnlyFn } from "@tanstack/react-start";
import { ObjectId } from "mongodb";
import { collections } from "#/libs/server/sdk/mongodb/collections";

export const profile = createServerOnlyFn(async (cookie: string) => {
	if (!cookie) return null;

	const session = await collections.sessions.findOne(
		{ token: cookie },
		{ userId: 1, expiresAt: 1 },
	);

	if (!session || session.expiresAt <= new Date()) {
		return null;
	}

	if (!ObjectId.isValid(session.userId)) {
		return null;
	}

	const user = await collections.users.findOne(
		{ _id: new ObjectId(session.userId) },
		{
			firstName: 1,
			lastName: 1,
			email: 1,
			avatar: 1,
		},
	);

	if (!user) return null;

	return {
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		avatar: user.avatar ?? null,
	};
});

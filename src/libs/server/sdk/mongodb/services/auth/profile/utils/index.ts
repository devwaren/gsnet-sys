import { createServerOnlyFn } from "@tanstack/react-start";
import { ObjectId } from "mongodb";
import { collections } from "#/libs/server/sdk/mongodb/collections";

export const profile = createServerOnlyFn(async (cookie: string) => {
	if (!cookie) {
		return Response.json(
			{ message: "Session token is required." },
			{ status: 401 },
		);
	}

	const session = await collections.sessions.findOne(
		{ token: cookie },
		{ userId: 1, expiresAt: 1 },
	);

	if (!session || new Date(session.expiresAt).getTime() <= Date.now()) {
		return Response.json(
			{ message: "Session is invalid or expired." },
			{ status: 401 },
		);
	}

	if (!ObjectId.isValid(session.userId)) {
		return Response.json({ message: "Invalid user ID." }, { status: 400 });
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

	if (!user) {
		return Response.json({ message: "User not found." }, { status: 404 });
	}

	return Response.json(
		{
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			avatar: user.avatar ?? null,
		},
		{ status: 200 },
	);
});

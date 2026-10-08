import { createServerOnlyFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { ObjectId } from "mongodb";
import { unauthorized } from "#/libs/server/res";
import { collections } from "#/libs/server/sdk/mongodb/collections";
import type { ReqFn } from "#/libs/server/types";
import { userRetrieved } from "./res";

const profile = createServerOnlyFn<ReqFn>(async () => {
	const cookie = getCookie("session_token");

	const sessions = collections.sessions;
	const userAccount = collections.users;

	if (!cookie) return unauthorized();

	const session = await sessions.findOne(
		{
			token: cookie,
		},
		{
			userId: 1,
		},
	);

	if (!session) return unauthorized();

	const user = await userAccount.findOne(
		{
			_id: new ObjectId(session.userId),
		},
		{
			firstName: 1,
			lastName: 1,
			email: 1,
			avatar: 1,
		},
	);

	if (!user) return unauthorized();

	return userRetrieved(user);
});

export { profile };

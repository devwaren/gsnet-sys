import { createServerOnlyFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { ObjectId } from "mongodb";
import { http } from "#/libs/server/constants";
import { collections } from "#/libs/server/sdk/mongodb/collections";

export const get = createServerOnlyFn(async () => {
	const token = getCookie("session_token");

	if (!token) {
		return Response.json(
			{
				success: false,
				message: "Session token is missing.",
				statusText: http.responses.status[401],
				data: null,
			},
			{ status: 401 },
		);
	}

	const sessions = collections.sessions;
	const roles = collections.roles;
	const users = collections.users;

	const session = await sessions.findOne({ token }, { token: 1, userId: 1 });

	if (!session || !ObjectId.isValid(session.userId)) {
		return Response.json(
			{
				success: false,
				message: "Invalid session.",
				statusText: http.responses.status[401],
				data: null,
			},
			{ status: 401 },
		);
	}

	const role = await roles.findOne(
		{ userId: session.userId },
		{ userId: 1, role: 1 },
	);

	if (role?.role !== "admin") {
		return Response.json(
			{
				success: false,
				message: "Invalid permission.",
				statusText: http.responses.status[403],
				data: null,
			},
			{ status: 403 },
		);
	}

	const [userLists, usersRole] = await Promise.all([
		users.all({ sortBy: "_id" }),
		roles.all({}),
	]);

	const excludedId = new ObjectId(session.userId).toString();

	const roleMap = new Map(
		usersRole.map((item) => [item.userId.toString(), item.role]),
	);

	const exceptUser = userLists
		.filter((user) => user._id?.toString() !== excludedId)
		.map((user) => ({
			...user,
			role: user._id
				? (roleMap.get(user._id.toString()) ?? "unassigned")
				: "unassigned",
		}));

	return Response.json({
		success: true,
		message: "Users retrieved successfully.",
		statusText: "OK",
		data: exceptUser,
	});
});

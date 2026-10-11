import { http } from "#/libs/server/constants";
import type { UserType } from "./types";

export const userRetrieved = (user: UserType) =>
	Response.json(
		{
			message: "Successfully Retrieved.",
			data: user,
		},
		{
			status: 200,
		},
	);

export const unauthorized = () =>
	Response.json(
		{
			statusText: http.responses.status[401],
			message: http.responses.messages.invalidSession,
		},
		{ status: 401 },
	);

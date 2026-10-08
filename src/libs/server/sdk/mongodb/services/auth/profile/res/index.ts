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

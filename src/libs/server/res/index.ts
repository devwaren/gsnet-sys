import { http } from "#/libs/server/constants";

export const invalid = () =>
	Response.json(
		{
			message: http.responses.messages.invalid,
			statusText: http.responses.status[400],
		},
		{
			status: 400,
		},
	);

export const unauthorized = () =>
	Response.json(
		{
			message: "unauthorized",
			statusText: http.responses.status[401],
		},
		{
			status: 401,
		},
	);

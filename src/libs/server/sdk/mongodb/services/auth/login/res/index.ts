import { http } from "#/libs/server/constants";

export const unauthorizedlogin = () =>
	Response.json(
		{
			message: http.responses.messages.invalid,
			statusText: http.responses.status[401],
		},
		{
			status: 401,
		},
	);

export const successful = () =>
	Response.json(
		{
			message: http.responses.messages.loggedIn,
			statusText: http.responses.status[200],
		},
		{
			status: 200,
		},
	);

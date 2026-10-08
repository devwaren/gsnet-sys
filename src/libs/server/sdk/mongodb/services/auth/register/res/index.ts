import { http } from "#/libs/server/constants";

export const emailExists = () =>
	Response.json(
		{
			message: http.responses.messages.emailExists,
			statusText: http.responses.status[409],
		},
		{
			status: 409,
		},
	);

export const registerFailed = () =>
	Response.json(
		{
			message: http.responses.messages.registerFailed,
			statusText: http.responses.status[400],
		},
		{
			status: 400,
		},
	);

export const successful = () =>
	Response.json(
		{
			message: http.responses.messages.registered,
			statusText: http.responses.status[200],
		},
		{
			status: 200,
		},
	);

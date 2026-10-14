import { createServerFn } from "@tanstack/react-start";
import { httpClient } from "#/libs/client/http";
import { validate } from "./validation";

const forgotPassword = createServerFn({ method: "POST" })
	.validator(validate.email)
	.handler(async ({ data }) => {
		const res = await httpClient({
			url: "/api/v1/forgot-password",
			data,
		});

		return Response.json(res.data);
	});

export { forgotPassword };

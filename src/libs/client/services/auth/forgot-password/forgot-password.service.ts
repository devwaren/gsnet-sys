import { createServerFn } from "@tanstack/react-start";
import { httpServer } from "#/libs/server/http/index.ts";
import { validate } from "./validation";

const forgotPassword = createServerFn({ method: "POST" })
	.validator(validate.email)
	.handler(async ({ data }) => {
		const res = await httpServer({
			url: "/api/v1/forgot-password",
			data,
		});

		return Response.json(res.data);
	});

export { forgotPassword };

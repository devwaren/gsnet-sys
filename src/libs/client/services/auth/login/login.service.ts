import { createServerFn } from "@tanstack/react-start";
import { httpClient } from "#/libs/client/http";
import { validate } from "./validation";

const login = createServerFn({ method: "POST" })
	.validator(validate.login)
	.handler(async ({ data }) => {
		const res = await httpClient({
			url: "/api/v1/login",
			method: "POST",
			data,
		});

		return Response.json(res.data);
	});

export { login };

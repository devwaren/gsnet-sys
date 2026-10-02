import { createServerFn } from "@tanstack/react-start";
import { httpClient } from "../../../http";
import { validate } from "./validation";

const register = createServerFn({ method: "POST" })
	.validator(validate.register)
	.handler(async ({ data }) => {
		const res = await httpClient({
			url: "/api/v1/register",
			data,
		});

		return Response.json(res.data);
	});

export { register };

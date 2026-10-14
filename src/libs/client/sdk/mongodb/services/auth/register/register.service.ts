import { createServerFn } from "@tanstack/react-start";
import { httpClient } from "#/libs/client/http";
import type { HTTPResponse } from "#/libs/shared/types";
import { validate } from "./validation";

const register = createServerFn({ method: "POST" })
	.validator(validate.register)
	.handler(async ({ data }) => {
		const res = await httpClient<HTTPResponse>({
			url: "/api/v1/register",
			data,
		});

		return {
			success: true,
			message: res.data.message,
			statusText: res.data.statusText,
		};
	});

export { register };

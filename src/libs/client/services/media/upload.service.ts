import { createServerFn } from "@tanstack/react-start";
import { httpClient } from "#/libs/client/http";
import type { HTTPResponse } from "#/libs/shared/types";

const upload = createServerFn({ method: "POST" })
	.validator((data: FormData) => data)
	.handler(async ({ data }) => {
		const res = await httpClient<HTTPResponse>({
			url: "/api/v1/cloudinary",
			method: "POST",
			data,
		});

		return res.data;
	});

export { upload };

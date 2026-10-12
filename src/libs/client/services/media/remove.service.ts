import { createServerFn } from "@tanstack/react-start";
import { httpClient } from "#/libs/client/http";
import type { HTTPResponse } from "#/libs/shared/types";

type RemoveInput = {
	publicId: string;
	resourceType: "image" | "video" | "raw";
};

const remove = createServerFn({ method: "POST" })
	.validator((data: RemoveInput) => data)
	.handler(async ({ data }) => {
		const res = await httpClient<HTTPResponse>({
			url: "/api/v1/cloudinary",
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify(data),
		});

		return res.data;
	});

export { remove };

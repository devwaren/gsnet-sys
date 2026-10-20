import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { httpServer } from "#/libs/server/http";
import { server } from "#/libs/server/utils";
import type { HTTPResponse } from "#/libs/shared/types";
import { validate } from "./validation";

export const changePassword = createServerFn({
	method: "POST",
})
	.validator(validate.resetPassword)
	.handler(async ({ data }): Promise<HTTPResponse> => {
		const token = getCookie("session_token");

		if (!token) {
			throw new Error("Unauthorized");
		}

		try {
			const res = await httpServer<HTTPResponse>({
				url: `/api/v1/users?token=${encodeURIComponent(token)}/reset`,
				data,
			});

			return {
				success: res.data.success,
				message: res.data.message,
				statusText: res.data.statusText,
			};
		} catch (error) {
			server.error("Failed to reset password settings:", error);

			throw new Error("Unable to process the request.");
		}
	});

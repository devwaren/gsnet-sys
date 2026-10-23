import type { z } from "@dev-waren/react-form-kit";
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { isAxiosError } from "axios";
import { httpServer } from "#/libs/server/http";
import type { schema } from "#/libs/shared/schema";
import type { HTTPResponse } from "#/libs/shared/types";

type Users = z.infer<typeof schema.auth.users>;

export const get = createServerFn({ method: "GET" }).handler(async () => {
	const sessionToken = getCookie("session_token");

	if (!sessionToken) {
		return {
			success: false,
			message: "Session token is missing.",
			data: null,
			statusText: "Unauthorized",
		};
	}

	try {
		const res = await httpServer<HTTPResponse<Users[]>>({
			url: "/api/v1/users",
			method: "GET",
			headers: {
				Cookie: `session_token=${sessionToken}`,
			},
		});

		return res.data;
	} catch (error) {
		if (isAxiosError<HTTPResponse<Users[]>>(error)) {
			return {
				success: false,
				message: error.response?.data.message ?? "Request failed.",
				data: null,
				statusText: error.response?.data.statusText ?? "Request Failed",
			};
		}

		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: "An unexpected error occurred.",
			data: null,
			statusText: "Internal Server Error",
		};
	}
});

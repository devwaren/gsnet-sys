import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { isAxiosError } from "axios";
import { httpServer } from "#/libs/server/http";
import type { HTTPResponse } from "#/libs/shared/types";
import { validate } from "./validation";

export const add = createServerFn({ method: "POST" })
	.validator(validate.addClient)
	.handler(async ({ data }) => {
		const sessionToken = getCookie("session_token");

		if (!sessionToken) {
			return {
				success: false,
				message: "Session token is missing.",
				statusText: "Unauthorized",
			};
		}

		try {
			const res = await httpServer<HTTPResponse<{ data: unknown }>>({
				url: "/api/v1/clients",
				method: "POST",
				headers: {
					Cookie: `session_token=${sessionToken}`,
				},
				data,
			});

			return {
				success: res.data.success,
				message: res.data.message,
				statusText: res.data.statusText,
			};
		} catch (error) {
			if (isAxiosError<HTTPResponse<{ data: unknown }>>(error)) {
				return {
					success: false,
					message: error.response?.data.message ?? "Request failed.",
					statusText:
						error.response?.data?.statusText ?? "Internal Server Error",
				};
			}

			return {
				success: false,
				message:
					error instanceof Error
						? error.message
						: "An unexpected error occurred.",
				statusText: "Internal Server Error",
			};
		}
	});

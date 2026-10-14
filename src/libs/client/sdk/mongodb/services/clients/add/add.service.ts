import { createServerFn } from "@tanstack/react-start";
import { isAxiosError } from "axios";
import { httpClient } from "#/libs/client/http";
import type { HTTPResponse } from "#/libs/shared/types";
import { validate } from "./validation";

export const add = createServerFn({ method: "POST" })
	.validator(validate.addClient)
	.handler(async ({ data }) => {
		try {
			const res = await httpClient<HTTPResponse<{ data: unknown }>>({
				url: "/api/v1/clients",
				method: "POST",
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
					message: error.response?.data.message,
					statusText: error.response?.data?.statusText,
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

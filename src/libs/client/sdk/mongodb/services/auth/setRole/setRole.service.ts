import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import axios from "axios";
import { httpClient } from "#/libs/client/http";
import type { HTTPResponse } from "#/libs/shared/types";
import { validate } from "./validation";

export const setRole = createServerFn({ method: "POST" })
	.validator(validate.setRole)
	.handler(async ({ data }) => {
		const sessionCookie = getCookie("session_token");

		try {
			const res = await httpClient<HTTPResponse>({
				url: "/api/v1/users/role",
				method: "POST",
				headers: {
					Cookie: `session_token=${sessionCookie}`,
				},
				data,
			});

			return {
				success: res.data.success,
				message: res.data.message,
				statusText: res.data.statusText,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const body = error.response?.data as
					| { message?: string; statusText?: string }
					| undefined;

				return {
					success: false,
					message: body?.message ?? "Unable to assign role.",
					statusText: body?.statusText ?? "Unauthorized",
				};
			}
		}
	});

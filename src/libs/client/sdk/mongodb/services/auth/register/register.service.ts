import { createServerFn } from "@tanstack/react-start";
import axios from "axios";
import { httpServer } from "#/libs/server/http";
import type { HTTPResponse } from "#/libs/shared/types";
import { validate } from "./validation";

const register = createServerFn({ method: "POST" })
	.validator(validate.register)
	.handler(async ({ data }) => {
		try {
			const res = await httpServer<HTTPResponse>({
				url: "/api/v1/register",
				method: "POST",
				data,
			});

			return {
				success: true,
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
					message: body?.message ?? "Unable to sign in.",
					statusText: body?.statusText ?? "Unauthorized",
				};
			}
		}
	});

export { register };

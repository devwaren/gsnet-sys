import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import axios from "axios";
import { httpClient } from "#/libs/client/http";
import { validate } from "./validation";

type LoginResponse = {
	success: boolean;
	message: string;
	statusText: string;
};

const login = createServerFn({ method: "POST" })
	.validator(validate.login)
	.handler(async ({ data }): Promise<LoginResponse> => {
		try {
			const res = await httpClient<LoginResponse>({
				url: "/api/v1/login",
				method: "POST",
				data,
			});

			// Read Set-Cookie from the upstream API response.
			const cookies = res.headers["set-cookie"];

			if (cookies?.length) {
				// Extract the session token from the trusted API cookie.
				const sessionCookie = cookies.find((cookie) =>
					cookie.startsWith("session_token="),
				);

				if (sessionCookie) {
					const token = sessionCookie
						.split(";")[0]
						.split("=")
						.slice(1)
						.join("=");

					setCookie("session_token", token, {
						httpOnly: true,
						secure: true,
						sameSite: "lax",
						path: "/",
						partitioned: true,
						priority: "high",
					});
				}
			}

			return {
				success: true,
				message: res.data.message,
				statusText: res.data.statusText,
			};
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				const res = error.response?.data as
					| { message?: string; statusText?: string }
					| undefined;

				return {
					success: false,
					message: res?.message ?? "Unable to sign in.",
					statusText: res?.statusText ?? "Unauthorized",
				};
			}

			return {
				success: false,
				message: "Unable to sign in.",
				statusText: "Unauthorized",
			};
		}
	});

export { login };

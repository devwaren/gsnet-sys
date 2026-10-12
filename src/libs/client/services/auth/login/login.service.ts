import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import axios from "axios";
import { httpClient } from "#/libs/client/http";
import { server } from "#/libs/server/utils";
import type { HTTPResponse } from "#/libs/shared/types";
import { validate } from "./validation";

const login = createServerFn({ method: "POST" })
	.validator(validate.login)
	.handler(async ({ data }): Promise<HTTPResponse> => {
		try {
			const res = await httpClient<HTTPResponse>({
				url: "/api/v1/login",
				method: "POST",
				data,
			});

			const cookies = res.headers["set-cookie"];
			const sessionCookie = cookies
				?.flatMap((cookie) => cookie.split(/,(?=\s*session_token=)/i))
				.find((cookie) => /^\s*session_token=/i.test(cookie));

			if (!sessionCookie) {
				console.error("Login succeeded but session cookie is missing.");

				return {
					success: false,
					message: "Unable to establish a login session.",
					statusText: "Session cookie missing",
				};
			}

			const token = sessionCookie
				.split(";")[0]
				.replace(/^\s*session_token=/i, "")
				.trim();

			const expiresAt = sessionCookie.match(/(?:^|;)\s*Expires=([^;]+)/i)?.[1];

			const expires = expiresAt ? new Date(expiresAt) : undefined;

			if (!token) {
				return {
					success: false,
					message: "Unable to establish a login session.",
					statusText: "Invalid session cookie",
				};
			}

			setCookie("session_token", token, {
				httpOnly: true,
				secure: true,
				sameSite: "lax",
				partitioned: true,
				path: "/",
				...(expires && !Number.isNaN(expires.getTime()) ? { expires } : {}),
			});

			return {
				success: true,
				message: res.data.message,
				statusText: res.data.statusText,
			};
		} catch (error: unknown) {
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

			server.error("Login error:", error);

			return {
				success: false,
				message: "Unable to sign in.",
				statusText: "Unauthorized",
			};
		}
	});

export { login };

import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import axios from "axios";
import { httpClient } from "#/libs/client/http";
import { server } from "#/libs/server/utils";
import type { TokenResponse, TokenResult } from "./types";

export const getJWT = createServerFn({ method: "GET" }).handler(
	async (): Promise<TokenResult> => {
		const token = getCookie("session_token");

		if (!token) {
			return {
				success: false,
				message: "Invalid session.",
				statusText: "Unauthorized",
			};
		}

		try {
			const res = await httpClient<TokenResponse>({
				url: "/api/v1/token",
				method: "GET",
				headers: {
					Cookie: `session_token=${token}`,
				},
			});

			if (!res.data.success || !res.data.token) {
				return {
					success: false,
					message: res.data.message ?? "Unable to get token.",
					statusText: res.data.statusText ?? "Request failed",
				};
			}

			return {
				success: true,
				token: res.data.token,
				statusText: res.data.statusText ?? "OK",
				message: res.data.message,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const body = error.response?.data;

				return {
					success: false,
					message: body?.message ?? "Unable to get token.",
					statusText:
						body?.statusText ??
						(error.response?.status === 401
							? "Unauthorized"
							: "Request failed"),
				};
			}

			server.error("Failed to retrieve JWT:", error);

			return {
				success: false,
				message: "An unexpected error occurred.",
				statusText: "Internal Server Error",
			};
		}
	},
);

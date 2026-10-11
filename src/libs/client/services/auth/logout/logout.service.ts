import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import axios from "axios";
import { httpClient } from "#/libs/client/http";
import { server } from "#/libs/server/utils";

type LogoutResponse = {
	success: boolean;
	message: string;
	statusText?: string;
};

export const logout = createServerFn({ method: "POST" }).handler(
	async (): Promise<LogoutResponse> => {
		try {
			const sessionToken = getCookie("session_token");

			if (!sessionToken) {
				return {
					success: false,
					message: "Session cookie not found.",
					statusText: "Unauthorized",
				};
			}

			const res = await httpClient<LogoutResponse>({
				url: "/api/v1/logout",
				method: "DELETE",
				headers: {
					Cookie: `session_token=${sessionToken}`,
				},
			});

			if (!res.data.success) {
				return {
					success: false,
					message: res.data.message,
					statusText: res.data.statusText ?? "Logout failed",
				};
			}

			setCookie("session_token", "", {
				httpOnly: true,
				secure: true,
				sameSite: "lax",
				partitioned: true,
				path: "/",
				maxAge: 0,
				priority: "high",
			});

			return {
				success: true,
				message: res.data.message,
				statusText: res.data.statusText ?? "OK",
			};
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				const body = error.response?.data as
					| { message?: string; statusText?: string }
					| undefined;

				return {
					success: false,
					message: body?.message ?? "Unable to log out.",
					statusText: body?.statusText ?? "Logout failed",
				};
			}

			server.error("Logout error:", error);

			return {
				success: false,
				message: "Unable to log out.",
				statusText: "Logout failed",
			};
		}
	},
);

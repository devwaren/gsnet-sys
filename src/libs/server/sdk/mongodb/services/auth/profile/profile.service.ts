import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { profile } from "./utils";

export const getProfile = createServerFn({ method: "GET" }).handler(
	async () => {
		const cookie = getCookie("session_token");

		if (!cookie) return null;

		return profile(cookie);
	},
);

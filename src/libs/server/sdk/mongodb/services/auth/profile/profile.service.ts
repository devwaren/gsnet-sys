import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { unauthorized } from "./res";
import { profile } from "./utils";

export const getProfile = createServerFn({ method: "GET" }).handler(
	async () => {
		const cookie = getCookie("session_token");

		if (!cookie) return unauthorized();

		const res = await profile(cookie);

		if (!res.ok) return unauthorized();

		return res.json();
	},
);

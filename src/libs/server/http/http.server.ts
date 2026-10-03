import { createServerOnlyFn } from "@tanstack/react-start";
import axios, { type AxiosRequestConfig } from "axios";
import { gen } from "#/libs/server/gen";

// HTTP Server BFF - Backend For Frontend

const httpServer = createServerOnlyFn(
	async <T = unknown>(config: AxiosRequestConfig) => {
		const method = (config.method ?? "GET").toUpperCase();
		const url = String(config.url ?? "");
		const timestamp = Date.now();

		const body =
			typeof config.data === "string"
				? config.data
				: config.data
					? JSON.stringify(config.data)
					: "";

		const payload = [method, url, timestamp, body].join(":");

		const signature = gen.internalToken(payload);

		return axios<T>({
			...config,
			headers: {
				"x-internal-signature": signature,
				"x-internal-timestamp": timestamp.toString(),
				...config.headers,
			},
		});
	},
);

export { httpServer };

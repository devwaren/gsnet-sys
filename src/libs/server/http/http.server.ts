import { createServerOnlyFn } from "@tanstack/react-start";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios, { AxiosError } from "axios";
import { server } from "#/libs/server/utils";
import { gen } from "../gen";

const httpServer = createServerOnlyFn(
	async <T = unknown>(
		config: AxiosRequestConfig,
	): Promise<AxiosResponse<T>> => {
		const controller = new AbortController();

		const timeout = setTimeout(() => {
			controller.abort();
		}, 10_000);

		try {
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

			server.log("[BFF] HTTP Server Initiated");

			const res = await axios<T>({
				...config,
				signal: config.signal ?? controller.signal,
				headers: {
					...config.headers,
					"x-internal-signature": signature,
					"x-internal-timestamp": timestamp.toString(),
				},
			});

			server.log("[BFF]", res.status, "success!");

			return res;
		} catch (error) {
			if (error instanceof AxiosError) {
				server.log("[BFF]", error.status, "failed!");
			} else {
				server.log("[BFF] Request failed", error);
			}

			throw error;
		} finally {
			clearTimeout(timeout);
		}
	},
);

export { httpServer };

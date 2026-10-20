import { setEnv } from "@dev-waren/mongodb";
import { createServerOnlyFn } from "@tanstack/react-start";
import type { AxiosResponse } from "axios";
import axios, { AxiosError } from "axios";
import { gen } from "#/libs/server/gen";
import { server } from "#/libs/server/utils/log";
import type { HttpServerConfig } from "./types";

const axiosServer = axios.create({
	baseURL: setEnv("BASE_URL"),
	withCredentials: true,
});

export const httpServerService = createServerOnlyFn(
	async <T = unknown>(config: HttpServerConfig): Promise<AxiosResponse<T>> => {
		const controller = new AbortController();

		const timeout = setTimeout(() => {
			controller.abort();
		}, 10_000);

		try {
			const { request, headers: configHeaders, ...axiosConfig } = config;

			const method = (axiosConfig.method ?? "GET").toUpperCase();
			const url = String(axiosConfig.url ?? "");
			const timestamp = Date.now();

			const body =
				typeof axiosConfig.data === "string"
					? axiosConfig.data
					: axiosConfig.data
						? JSON.stringify(axiosConfig.data)
						: "";

			const payload = [method, url, timestamp, body].join(":");
			const signature = gen.internalToken(payload);

			const cookie = request?.headers.get("cookie");

			server.log("[BFF] HTTP Server Initiated");

			const res = await axiosServer<T>({
				...axiosConfig,
				signal: axiosConfig.signal ?? controller.signal,
				headers: {
					...configHeaders,
					...(cookie ? { Cookie: cookie } : {}),
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

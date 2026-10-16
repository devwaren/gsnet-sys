import type { AxiosRequestConfig } from "axios";
import { env } from "#/libs/server/env";
import { serverOnly } from "./http.server";

const httpServer = <T = unknown>(config: AxiosRequestConfig) => {
	return serverOnly<T>({
		...config,
		baseURL: env.server.url,
		withCredentials: true,
		headers: {
			...config.headers,
			"Cache-Control": "no-store, no-cache, must-revalidate",
			Pragma: "no-cache",
		},
	});
};

export { httpServer };

import type { AxiosRequestConfig } from "axios";
import { env } from "#/libs/server/env";
import { httpServerService } from "./services";
import { serverOnly } from "./services/guard";

const httpServer = <T = unknown>(config: AxiosRequestConfig) => {
	serverOnly();

	return httpServerService<T>({
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

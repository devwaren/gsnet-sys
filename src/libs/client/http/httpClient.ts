import type { AxiosRequestConfig } from "axios";
import { env } from "#/libs/server/env";
import { httpServer } from "#/libs/server/http";

const httpClient = <T = unknown>(config: AxiosRequestConfig) => {
	return httpServer<T>({
		...config,
		baseURL: env.server.url,
		withCredentials: true,
	});
};

export { httpClient };

import type { AxiosRequestConfig } from "axios";
import { env } from "#/libs/server/env";
import { httpServer } from "#/libs/server/http";

// HTTP Client Bridge to HTTP Server

const httpClient = (config: AxiosRequestConfig) => {
	return httpServer({
		baseURL: env.server.url,
		method: "GET",
		withCredentials: true,
		...config,
	});
};

export { httpClient };

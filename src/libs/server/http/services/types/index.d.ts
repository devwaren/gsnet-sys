import type { AxiosRequestConfig } from "axios";

export type HttpServerConfig = AxiosRequestConfig & {
	request?: Request;
};

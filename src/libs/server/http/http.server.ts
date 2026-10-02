import { createServerOnlyFn } from "@tanstack/react-start";
import axios, { type AxiosRequestConfig } from "axios";

// HTTP Server BFF - Backend For Frontend

const httpServer = createServerOnlyFn(
	async <T = unknown>(config: AxiosRequestConfig) =>
		await axios<T>({
			...config,
		}),
);

export { httpServer };

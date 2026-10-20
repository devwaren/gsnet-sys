import { createClientOnlyFn } from "@tanstack/react-start";
import { AxiosError, type AxiosRequestConfig } from "axios";
import { clientOnly } from "#/libs/client/utils";
import { axiosClient } from "./config";

type HttpClientConfig = AxiosRequestConfig & {
	url: string;
};

export const httpClient = createClientOnlyFn(
	async <T = unknown>({ url, ...config }: HttpClientConfig): Promise<T> => {
		clientOnly("httpClient");

		try {
			const response = await axiosClient.request<T>({
				url,
				...config,
			});

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const responseData = error.response?.data as
					| { message?: string }
					| undefined;

				throw new Error(
					responseData?.message ?? error.message ?? "Request failed.",
				);
			}

			throw error;
		}
	},
);

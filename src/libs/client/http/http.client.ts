import { createClientOnlyFn } from "@tanstack/react-start";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

type HttpClientConfig = AxiosRequestConfig & {
	url: string;
};

const axiosClient = axios.create({
	baseURL: import.meta.env.BASE_URL,
	withCredentials: true,
});

export const httpClient = createClientOnlyFn(
	async <T = unknown>({ url, ...config }: HttpClientConfig): Promise<T> => {
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

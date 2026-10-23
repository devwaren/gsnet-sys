import type { z } from "@dev-waren/mongodb";
import { createServerFn } from "@tanstack/react-start";
import { isAxiosError } from "axios";
import { httpServer } from "#/libs/server/http";
import type { schema } from "#/libs/shared/schema";
import type { HTTPResponse } from "#/libs/shared/types";

type Customer = z.infer<typeof schema.customer.client>;

export const get = createServerFn({ method: "GET" }).handler(async () => {
	try {
		const res = await httpServer<HTTPResponse<Customer>>({
			url: "/api/v1/clients",
			method: "GET",
		});

		return {
			success: res.data.success,
			message: res.data.message,
			data: res.data.data,
		};
	} catch (error) {
		if (isAxiosError<HTTPResponse<Customer[]>>(error)) {
			return {
				success: false,
				message: error.response?.data.message ?? "Request failed.",
				data: null,
				statusText: error.response?.data.statusText ?? null,
			};
		}

		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: "An unexpected error occurred.",
			data: null,
			statusText: "Internal Server Error",
		};
	}
});

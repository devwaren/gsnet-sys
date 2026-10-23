import type { z } from "@dev-waren/react-form-kit";
import { createServerFn } from "@tanstack/react-start";
import axios from "axios";
import { httpServer } from "#/libs/server/http";
import { server } from "#/libs/server/utils";
import type { schema } from "#/libs/shared/schema";
import type { HTTPResponse } from "#/libs/shared/types";

type Invoices = z.infer<typeof schema.billing.invoice>[];

export const get = createServerFn({ method: "GET" }).handler(async () => {
	try {
		const res = await httpServer<HTTPResponse<Invoices>>({
			url: "/api/v1/invoices",
			method: "GET",
		});

		const invoice = res.data;

		return {
			success: invoice.success,
			message: invoice.message,
			data: invoice.data,
			statusText: invoice.statusText,
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const body = error.response?.data as
				| { message?: string; statusText?: string }
				| undefined;

			return {
				success: false,
				message: body?.message ?? "Unable to fetch invoices.",
				data: undefined,
				statusText:
					body?.statusText ??
					(error.response?.status === 401 ? "Unauthorized" : "Request Failed"),
			};
		}

		server.error("Failed to fetch invoices:", error);

		return {
			success: false,
			message: "Unable to fetch invoices.",
			statusText: "Internal Server Error",
		};
	}
});

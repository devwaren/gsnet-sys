import { createServerFn } from "@tanstack/react-start";
import axios from "axios";
import { httpServer } from "#/libs/server/http";
import { server } from "#/libs/server/utils";
import type { HTTPResponse } from "#/libs/shared/types";
import { validate } from "#/libs/shared/validation";

export const add = createServerFn({ method: "POST" })
	.validator(validate.billing.invoices)
	.handler(async ({ data }) => {
		try {
			const res = await httpServer<HTTPResponse>({
				url: "/api/v1/invoices",
				method: "POST",
				data,
			});

			return {
				success: res.data.success,
				message: res.data.message,
				statusText: res.data.statusText,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const body = error.response?.data as
					| { message?: string; statusText?: string }
					| undefined;

				return {
					success: false,
					message: body?.message ?? "Unable to add invoices.",
					statusText:
						body?.statusText ??
						(error.response?.status === 401
							? "Unauthorized"
							: "Request Failed"),
				};
			}

			server.error("Failed to add invoices:", error);

			return {
				success: false,
				message: "Unable to add invoices.",
				statusText: "Internal Server Error",
			};
		}
	});

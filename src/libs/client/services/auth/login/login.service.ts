import { createServerFn } from "@tanstack/react-start";
import axios from "axios";
import { httpClient } from "#/libs/client/http";
import { validate } from "./validation";

type LoginResponse =
	| {
			success: true;
			message: string;
			statusText: string;
	  }
	| {
			success: false;
			message: string;
			statusText: string;
	  };

const login = createServerFn({ method: "POST" })
	.validator(validate.login)
	.handler(async ({ data }): Promise<LoginResponse> => {
		try {
			const res = await httpClient<LoginResponse>({
				url: "/api/v1/login",
				method: "POST",
				data,
			});

			return {
				success: true,
				message: res.data.message,
				statusText: res.data.statusText,
			};
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				const res = error.response?.data as
					| {
							message?: string;
							statusText?: string;
					  }
					| undefined;

				return {
					success: false,
					message: res?.message ?? "Unable to sign in.",
					statusText: res?.statusText ?? "Unauthorized",
				};
			}

			return {
				success: false,
				message: "Unable to sign in.",
				statusText: "Unauthorized",
			};
		}
	});

export { login };

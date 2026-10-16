import { createClientOnlyFn } from "@tanstack/react-start";
import type { HTTPResponse } from "#/libs/shared/types";

type RemoveInput = {
	publicId: string;
	resourceType: "image" | "video" | "raw";
};

const remove = createClientOnlyFn(
	async (data: RemoveInput): Promise<HTTPResponse> => {
		try {
			const res = await fetch("/api/v2/cloudinary", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = (await res.json()) as HTTPResponse;

			return {
				success: res.ok && result.success,
				message: result.message,
				statusText: result.statusText,
			};
		} catch (error) {
			return {
				success: false,
				message:
					error instanceof Error
						? error.message
						: "Failed to remove Cloudinary resource.",
			} as HTTPResponse;
		}
	},
);

export { remove };

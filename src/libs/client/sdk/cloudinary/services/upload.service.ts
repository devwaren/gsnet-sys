import { createIsomorphicFn } from "@tanstack/react-start";
import { httpClient } from "#/libs/client/http";
import { http } from "#/libs/server/constants";
import type { HTTPResponse } from "#/libs/shared/types";

type Props = {
	data: {
		image: File;
	};
};

type ImageFileFn = ({ data }: Props) => Promise<HTTPResponse>;

export const upload: ImageFileFn = createIsomorphicFn()
	.client(async ({ data }: Props): Promise<HTTPResponse> => {
		try {
			const formData = new FormData();
			formData.set("image", data.image);

			return await httpClient<HTTPResponse>({
				url: "/api/v2/cloudinary",
				method: "POST",
				data: formData,
			});
		} catch (error) {
			return {
				success: false,
				message:
					error instanceof Error
						? error.message
						: "An unexpected error occurred.",
			} as HTTPResponse;
		}
	})
	.server(
		async (_props: Props): Promise<HTTPResponse> => ({
			success: false,
			message: "Image uploads must be initiated from the client.",
			statusText: http.responses.status[400],
		}),
	);

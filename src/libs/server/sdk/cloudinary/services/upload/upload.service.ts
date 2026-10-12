import { createServerOnlyFn } from "@tanstack/react-start";
import { cloudinary } from "#/libs/server/sdk/cloudinary/config";
import { schemaServer } from "#/libs/server/validations";
import type { UploadService } from "./types";

export const upload = createServerOnlyFn<UploadService>(
	async (file, options) => {
		const validatedOptions = schemaServer.cloudinary.parse(options ?? {});

		return cloudinary.uploader.upload(file, {
			resource_type: "auto",
			...validatedOptions,
		});
	},
);

import { createServerOnlyFn } from "@tanstack/react-start";
import { cloudinary } from "#/libs/server/sdk/cloudinary/config";
import type { RemoveService } from "./types";

export const remove = createServerOnlyFn<RemoveService>(
	async (publicId, resourceType) => {
		return cloudinary.uploader.destroy(publicId, {
			resource_type: resourceType,
			invalidate: true,
		});
	},
);

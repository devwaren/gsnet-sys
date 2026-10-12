import type { DeleteApiResponse } from "cloudinary";

export type RemoveService = (
	publicId: string,
	resourceType: "image" | "video" | "raw" = "image",
) => Promise<DeleteApiResponse>;

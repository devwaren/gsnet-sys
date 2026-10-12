import type { UploadApiResponse } from "cloudinary";
import type { cloudinary } from "#/libs/server/sdk/cloudinary/config";

export type UploadService = (
	file: string,
	options: Parameters<typeof cloudinary.uploader.upload>[1],
) => Promise<UploadApiResponse>;

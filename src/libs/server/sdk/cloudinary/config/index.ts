import { v2 as cloudinary } from "cloudinary";
import { env } from "#/libs/server/env";

cloudinary.config({
	cloud_name: env.sdk.cloudinary.cloudName,
	api_key: env.sdk.cloudinary.apiKey,
	api_secret: env.sdk.cloudinary.secretKey,
	secure: true,
});

export { cloudinary };

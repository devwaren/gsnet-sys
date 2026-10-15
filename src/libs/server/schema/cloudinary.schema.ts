import { sanitize, z } from "@dev-waren/mongodb";

export const cloudinary = z.object({
	publicId: z
		.string()
		.min(1)
		.max(255)
		.regex(
			/^[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/,
			"Invalid Cloudinary public ID format",
		),
	secureUrl: z.string().url().optional().transform(sanitize),
	resourceType: z.enum(["image", "video", "raw"]).default("image"),
	format: z.string().optional().transform(sanitize),
	bytes: z.number().int().nonnegative().optional(),
});

export const uploadFile = z
	.custom<File>(
		(value) => typeof File !== "undefined" && value instanceof File,
		"File is required",
	)
	.refine((file) => file.size > 0, "File cannot be empty")
	.refine(
		(file) => file.size <= 10 * 1024 * 1024,
		"File must be 10 MB or smaller",
	)
	.refine(
		(file) =>
			["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
				file.type,
			),
		"Unsupported image type",
	);

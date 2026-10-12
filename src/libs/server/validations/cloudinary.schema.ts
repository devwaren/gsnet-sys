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

export const uploadFile = z.string()
	.min(1, "File is required")
	.refine(
		(value) =>
			/^https?:\/\/.+/.test(value) ||
			/^data:[^;]+;base64,[A-Za-z0-9+/]+={0,2}$/.test(value) ||
			!/^data:/.test(value),
		"Invalid file format",
	);
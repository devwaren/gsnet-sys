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

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/gif",
];

export const uploadFile = z
	.custom<File>(
		(value): value is File =>
			value !== null &&
			typeof value === "object" &&
			typeof (value as File).name === "string" &&
			typeof (value as File).size === "number" &&
			typeof (value as File).type === "string" &&
			typeof (value as File).arrayBuffer === "function",
		{ message: "A valid file is required." },
	)
	.refine((file) => file.size > 0, {
		message: "File cannot be empty.",
	})
	.refine((file) => file.size <= MAX_FILE_SIZE, {
		message: "File must be 5 MB or smaller.",
	})
	.refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
		message: "Unsupported image type.",
	});

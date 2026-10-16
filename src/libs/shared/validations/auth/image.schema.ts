import { z } from "@dev-waren/react-form-kit";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/gif",
];

export const upload = z.object({
	image: z
		.instanceof(File, { message: "Please select an image." })
		.refine((file) => file.size > 0, {
			message: "Image cannot be empty.",
		})
		.refine((file) => file.size <= MAX_FILE_SIZE, {
			message: "Image must be 5 MB or smaller.",
		})
		.refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
			message: "Only JPEG, PNG, WebP, and GIF images are allowed.",
		}),
});

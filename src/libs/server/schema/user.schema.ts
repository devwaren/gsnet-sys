import { objectId, sanitize, z } from "@dev-waren/mongodb";

export const user = z.object({
	_id: objectId,
	firstName: z
		.string()
		.min(1, { message: "firstname is required." })
		.transform(sanitize),

	lastName: z
		.string()
		.min(1, { message: "lastname is required." })
		.transform(sanitize),

	email: z.string().email({ message: "email is required." }),

	avatar: z
		.string()
		.min(1, { message: "avatar url is required" })
		.transform(sanitize)
		.optional(),
});

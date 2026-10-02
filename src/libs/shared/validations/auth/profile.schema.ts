import { sanitize, z } from "@dev-waren/react-form-kit";

const profile = z.object({
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

export { profile };

import { sanitize, z } from "@dev-waren/react-form-kit";

const register = z.object({
	firstName: z
		.string()
		.min(2, { message: "firstname is required." })
		.transform(sanitize),
	lastName: z
		.string()
		.min(1, { message: "lastname is required." })
		.transform(sanitize),
	email: z
		.string()
		.email({ message: "email is required." })
		.transform(sanitize),
	phone: z.string().max(11, { message: "phone must exactly 11 digits" }),
	avatar: z.string().optional().transform(sanitize),
});

export { register };

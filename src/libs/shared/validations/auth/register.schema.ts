import { sanitize, z } from "@dev-waren/react-form-kit";
import { jwt } from "./jwt.schema";

const register = z
	.object({
		token: jwt,
		username: z
			.string()
			.min(8, { message: "username must be atleast 8 characters long" })
			.transform(sanitize),
		firstName: z
			.string()
			.min(2, { message: "firstname is required." })
			.transform(sanitize),
		lastName: z
			.string()
			.min(2, { message: "surname is required." })
			.transform(sanitize),
		email: z.string().email({ message: "email is required." }),
		avatar: z.string().optional().default(""),
		password: z
			.string()
			.min(8, { message: "password must be atleast 8 characters long." })
			.transform(sanitize),
		confirmPassword: z.string().transform(sanitize),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match.",
		path: ["confirmPassword"],
	});

export { register };

import { sanitize, z } from "@dev-waren/react-form-kit";

const login = z.object({
	email: z
		.string()
		.email({ message: "email is required." })
		.transform(sanitize),
	password: z
		.string()
		.min(1, { message: "password is required." })
		.transform(sanitize),
});

export { login };

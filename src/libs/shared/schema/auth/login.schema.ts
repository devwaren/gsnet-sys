import { sanitize, z } from "@dev-waren/react-form-kit";

export const login = z.object({
	email: z.string().email({ message: "email is required" }).transform(sanitize),
	password: z
		.string()
		.min(8, { message: "password must be atleast 8 characters" })
		.transform(sanitize),
});

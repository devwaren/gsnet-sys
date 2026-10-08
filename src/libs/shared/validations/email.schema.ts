import { sanitize, z } from "@dev-waren/react-form-kit";

export const email = z.object({
	email: z.string().email({ message: "email is required" }).transform(sanitize),
});

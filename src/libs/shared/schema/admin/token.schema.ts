import { sanitize, z } from "@dev-waren/react-form-kit";

export const token = z.object({
	email: z.string().email(),
	token: z.string().transform(sanitize),
	role: z.enum(["admin", "user", "staff"]),
});

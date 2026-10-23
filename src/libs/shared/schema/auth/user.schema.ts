import { sanitize, z } from "@dev-waren/react-form-kit";

export const users = z.object({
	firstName: z.string().transform(sanitize),
	lastName: z.string().transform(sanitize),
	email: z.string().email(),
	avatar: z.string().transform(sanitize),
});

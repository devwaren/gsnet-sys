import { z } from "@dev-waren/react-form-kit";

export const filter = z.object({
	search: z.string(),
	role: z.enum(["all", "admin", "user"]),
	sortBy: z.enum(["name", "createdAt"]),
});

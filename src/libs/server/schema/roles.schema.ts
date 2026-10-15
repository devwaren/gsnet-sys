import { objectId, sanitize, z } from "@dev-waren/mongodb";

export const roles = z.object({
	_id: objectId,
	userId: z.string().transform(sanitize),
	role: z.enum(["user", "admin", "staff"]),
	createdAt: z.date().default(() => new Date()),
});

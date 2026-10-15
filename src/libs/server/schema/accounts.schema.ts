import { objectId, sanitize, z } from "@dev-waren/mongodb";

export const accounts = z.object({
	userId: objectId,
	username: z.string().transform(sanitize),
	accountId: objectId,
	password: z.string().transform(sanitize),
});

import { objectId, sanitize, z } from "@dev-waren/mongodb";

export const csrf = z.object({
	_id: objectId,
	token: z.string().transform(sanitize),
	userId: objectId,
	expireAt: z.date(),
});

import { objectId, sanitize, z } from "@dev-waren/mongodb";

export const sessions = z.object({
	_id: objectId,
	sessionId: z.string().transform(sanitize),
	token: z.string().transform(sanitize),
	expiresAt: z.date().transform(sanitize),
	ipAddress: z.string().transform(sanitize),
	userAgent: z.string().transform(sanitize),
	userId: z.string().transform(sanitize),
});

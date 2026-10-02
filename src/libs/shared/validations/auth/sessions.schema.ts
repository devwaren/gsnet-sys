import { sanitize, z } from "@dev-waren/react-form-kit";

export const sessions = z.object({
	sessionId: z.string().transform(sanitize),
	token: z.string().transform(sanitize),
	expiresAt: z.date().transform(sanitize),
	ipAddress: z.string().transform(sanitize),
	userAgent: z.string().transform(sanitize),
	userId: z.string().transform(sanitize),
});

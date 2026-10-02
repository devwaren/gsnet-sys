import { sanitize, z } from "@dev-waren/react-form-kit";

const sessionIds = z.object({
	sessionId: z.string().transform(sanitize),
});

export { sessionIds };

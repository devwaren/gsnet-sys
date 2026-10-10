import { randomBytes, randomUUID } from "node:crypto";

const SESSION_EXPIRY_DAYS = 7;

const create = async ({ request }: { request: Request }) => {
	const sessionId = randomUUID().toString();

	const token = randomBytes(32).toString("hex");
	const expiresAt = new Date(
		Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
	);

	// Get request metadata
	const forwardedFor = request.headers.get("x-forwarded-for");
	const ipAddress =
		forwardedFor?.split(",")[0]?.trim() ??
		request.headers.get("x-real-ip") ??
		"127.0.0.1";

	const userAgent = request.headers.get("user-agent") ?? "unknown";

	return { sessionId, ipAddress, userAgent, token, expiresAt };
};

export const session = {
	create,
};

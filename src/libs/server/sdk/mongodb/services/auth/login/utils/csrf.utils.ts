import { createHmac, randomBytes } from "node:crypto";
import type { objectId, z } from "@dev-waren/mongodb";
import { env } from "#/libs/server/env";
import { collections } from "#/libs/server/sdk/mongodb/collections";

const CSRF_TTL_MS = 60 * 60 * 1000; // 1 hour

export const genCSRF = async (userId: z.infer<typeof objectId>) => {
	const secret = env.server.secrets.jwt;

	if (!secret) {
		throw new Error("JWT_SECRET is not configured");
	}

	const nonce = randomBytes(32).toString("hex");

	const csrf = createHmac("sha256", secret)
		.update(`csrf:${userId?.toString()}:${nonce}`)
		.digest("hex");

	const expireAt = new Date(Date.now() + CSRF_TTL_MS);

	await collections.tokens.create({
		token: csrf,
		userId,
		expireAt,
	});

	return csrf;
};

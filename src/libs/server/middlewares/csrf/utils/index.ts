import { createHmac, randomBytes } from "node:crypto";
import { env } from "#/libs/server/env";
import { collections } from "#/libs/server/sdk/mongodb/collections";

export const rotateCSRF = async (currentToken: string, userId: string) => {
	const secret = env.server.secrets.csrf;

	if (!secret) {
		throw new Error("CSRF_SECRET is not configured");
	}

	const nextToken = createHmac("sha256", secret)
		.update(
			`csrf:rotate:${userId}:${currentToken}:${randomBytes(32).toString("hex")}`,
		)
		.digest("hex");

	const current = await collections.tokens.findOne({
		token: currentToken,
	});

	if (!current || current.userId?.toString() !== userId) {
		throw new Error("Invalid CSRF token");
	}

	if (current.expireAt.getTime() <= Date.now()) {
		throw new Error("CSRF token expired");
	}

	await collections.tokens.create({
		token: nextToken,
		userId: current.userId,
		expireAt: new Date(Date.now() + 60 * 60 * 1000),
	});

	await collections.tokens.deleteOne({
		token: currentToken,
	});

	return nextToken;
};

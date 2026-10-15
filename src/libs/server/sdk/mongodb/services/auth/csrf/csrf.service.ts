import { createHmac, randomBytes } from "node:crypto";
import { createServerOnlyFn } from "@tanstack/react-start";
import { ObjectId } from "mongodb";
import { env } from "#/libs/server/env";
import { collections } from "#/libs/server/sdk/mongodb/collections";

const CSRF_TTL_MS = 60 * 60 * 1000;

const errorResponse = (message: string, status: number) =>
	Response.json(
		{
			success: false,
			message,
			statusText: ResponseStatus(status),
		},
		{ status },
	);

function ResponseStatus(status: number): string {
	switch (status) {
		case 401:
			return "Unauthorized";
		case 404:
			return "Not Found";
		case 403:
			return "Forbidden";
		case 500:
			return "Internal Server Error";
		case 409:
			return "Conflict";
		default:
			return "Error";
	}
}

export const csrf = createServerOnlyFn(
	async ({ request }: { request: Request }) => {
		const cookieHeader = request.headers.get("cookie");

		const sessionToken = cookieHeader
			?.split(";")
			.map((cookie) => cookie.trim())
			.find((cookie) => cookie.startsWith("session_token="))
			?.slice("session_token=".length);

		if (!sessionToken) {
			return errorResponse("Unauthorized", 401);
		}

		const session = await collections.sessions.findOne({
			token: sessionToken,
		});

		if (!session?.userId) {
			return errorResponse("Invalid session", 401);
		}

		if (
			session.expiresAt &&
			new Date(session.expiresAt).getTime() <= Date.now()
		) {
			return errorResponse("Session expired", 401);
		}

		const userId = new ObjectId(session.userId.toString());
		const secret = env.server.secrets.csrf;

		if (!secret) {
			return errorResponse("CSRF service unavailable", 500);
		}

		const nextToken = createHmac("sha256", secret)
			.update(`csrf:${userId}:${randomBytes(32).toString("hex")}`)
			.digest("hex");

		const expireAt = new Date(Date.now() + CSRF_TTL_MS);

		// Find an existing token, including an expired one.
		const current = await collections.tokens.findOne({ userId });

		if (current) {
			// Replace the existing token, including when it has expired.
			const rotated = await collections.tokens.findOneAndUpdate(
				{
					_id: current._id,
					token: current.token,
				},
				{
					$set: {
						token: nextToken,
						expireAt,
					},
				},
				{ returnDocument: "after" },
			);

			if (!rotated) {
				return errorResponse("CSRF token renewal failed", 409);
			}
		} else {
			// No token record exists, so create one.
			await collections.tokens.create({
				token: nextToken,
				userId,
				expireAt,
			});
		}

		return Response.json({ success: true });
	},
);

import { sanitize, z } from "@dev-waren/mongodb";
import { createServerOnlyFn } from "@tanstack/react-start";
import { ObjectId } from "mongodb";
import { decryptUserId } from "#/libs/server/gen/tokens";
import { mongoSDK } from "#/libs/server/sdk/mongodb";
import { collections } from "#/libs/server/sdk/mongodb/collections";

const userIdSchema = z.string().trim().min(1).transform(sanitize);

export const getUserRole = createServerOnlyFn(async (userId: string) => {
	const result = userIdSchema.safeParse(userId);

	if (!result.success || !ObjectId.isValid(result.data)) {
		return null;
	}

	const userRole = await collections.roles.findOne(
		{ userId: result.data },
		{ userId: 1, role: 1 },
	);

	return userRole?.role ?? null;
});

export const checkAdmin = createServerOnlyFn(async () => {
	const session = await mongoSDK.services.auth.session();

	if (!session) {
		return {
			authorized: false,
			reason: "unauthenticated" as const,
		};
	}

	try {
		const result = userIdSchema.safeParse(decryptUserId(session.hashSnake));

		if (!result.success || !ObjectId.isValid(result.data)) {
			return {
				authorized: false,
				reason: "unauthenticated" as const,
			};
		}

		const userRole = await getUserRole(result.data);

		if (userRole !== "admin") {
			return {
				authorized: false,
				reason: "forbidden" as const,
			};
		}

		return { authorized: true as const };
	} catch {
		return {
			authorized: false,
			reason: "unauthenticated" as const,
		};
	}
});

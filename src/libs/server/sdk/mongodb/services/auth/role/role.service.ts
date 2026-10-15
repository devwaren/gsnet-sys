import { sanitize, z } from "@dev-waren/mongodb";
import { createServerOnlyFn } from "@tanstack/react-start";
import { ObjectId } from "mongodb";
import { decryptUserId } from "#/libs/server/gen/tokens";
import { mongoSDK } from "#/libs/server/sdk/mongodb";
import { collections } from "#/libs/server/sdk/mongodb/collections";

const userIdSchema = z.string().trim().min(1).transform(sanitize);

export type UserRole = "user" | "admin" | "staff";

const userRoleSchema = z.enum(["user", "admin", "staff"]);

export const getUserRole = createServerOnlyFn(
	async (userId: string): Promise<UserRole | null> => {
		const result = userIdSchema.safeParse(userId);

		if (!result.success || !ObjectId.isValid(result.data)) {
			return null;
		}

		const userRole = await collections.roles.findOne(
			{ userId: result.data },
			{ userId: 1, role: 1 },
		);

		const roleResult = userRoleSchema.safeParse(userRole?.role);

		return roleResult.success ? roleResult.data : null;
	},
);

export const checkAdmin = createServerOnlyFn(async () => {
	const session = await mongoSDK.services.auth.session();

	if (!session) {
		return {
			authorized: false as const,
			reason: "unauthenticated" as const,
		};
	}

	try {
		const result = userIdSchema.safeParse(decryptUserId(session.hashSnake));

		if (!result.success || !ObjectId.isValid(result.data)) {
			return {
				authorized: false as const,
				reason: "unauthenticated" as const,
			};
		}

		const userRole = await getUserRole(result.data);

		if (!userRole) {
			return {
				authorized: false as const,
				reason: "forbidden" as const,
			};
		}

		if (userRole !== "admin") {
			return {
				authorized: false as const,
				reason: "forbidden" as const,
			};
		}

		return { authorized: true as const };
	} catch {
		return {
			authorized: false as const,
			reason: "unauthenticated" as const,
		};
	}
});

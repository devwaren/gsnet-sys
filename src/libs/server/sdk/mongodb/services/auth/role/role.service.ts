import { sanitize, z } from "@dev-waren/mongodb";
import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";
import { mongoSDK } from "#/libs/server/sdk/mongodb";
import { collections } from "#/libs/server/sdk/mongodb/collections";

const userIdSchema = z.string().trim().min(1).transform(sanitize);

const getUserRole = createServerOnlyFn(async (userId: string) => {
	const result = userIdSchema.safeParse(userId);

	if (!result.success) return null;

	const userRole = await collections.roles.findOne(
		{ userId: result.data },
		{ userId: 1, role: 1 },
	);

	return userRole?.role ?? null;
});

export const getRole = createServerFn({ method: "GET" })
	.validator((data: unknown) => {
		const result = userIdSchema.safeParse(data);

		if (!result.success) {
			throw new Error("Invalid user ID");
		}

		return result.data;
	})
	.handler(async ({ data }) => {
		return getUserRole(data);
	});

export const checkAdmin = createServerFn({ method: "GET" }).handler(
	async () => {
		const session = await mongoSDK.services.auth.getSession();

		if (!session) {
			return {
				authorized: false,
				reason: "unauthenticated" as const,
			};
		}

		const userRole = await getUserRole(session.userId);

		if (userRole !== "admin") {
			return {
				authorized: false,
				reason: "forbidden" as const,
			};
		}

		return { authorized: true as const };
	},
);

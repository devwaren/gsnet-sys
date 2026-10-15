import { createServerOnlyFn } from "@tanstack/react-start";
import { decryptUserId } from "#/libs/server/gen/tokens";
import { mongoSDK } from "#/libs/server/sdk/mongodb";

export const authorization = createServerOnlyFn(async () => {
	try {
		const session = await mongoSDK.services.auth.session();

		if (!session) return null;

		const userId = decryptUserId(session.hashSnake);

		const role = await mongoSDK.services.auth.getUserRole(userId);

		if (role !== "user" && role !== "admin" && role !== "staff") {
			return null;
		}

		const profile = await mongoSDK.services.auth.profile();

		if (!profile) return null;

		return { role, profile };
	} catch {
		return null;
	}
});

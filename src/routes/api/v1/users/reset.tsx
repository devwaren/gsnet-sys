import { createFileRoute } from "@tanstack/react-router";
import { mongoSDK } from "#/libs/server/sdk/mongodb";

export const Route = createFileRoute("/api/v1/users/reset")({
	server: {
		handlers: {
			POST: async ({ request }) =>
				await mongoSDK.services.settings.changePassword({ request }),
		},
	},
});

import { createFileRoute } from "@tanstack/react-router";
import { middlewares } from "#/libs/server/middlewares";
import { mongoSDK } from "#/libs/server/sdk/mongodb";

export const Route = createFileRoute("/api/v1/logout")({
	server: {
		middleware: [middlewares.csrf],
		handlers: {
			DELETE: async ({ request }) =>
				await mongoSDK.services.auth.logout({ request }),
		},
	},
});

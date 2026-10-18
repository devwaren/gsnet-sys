import { createFileRoute } from "@tanstack/react-router";
import { middlewares } from "#/libs/server/middlewares";
import { mongoSDK } from "#/libs/server/sdk/mongodb";

export const Route = createFileRoute("/api/v1/users/")({
	server: {
		middleware: [middlewares.csrf],
		handlers: {
			GET: async () => await mongoSDK.services.users.get(),
			POST: async ({ request }) =>
				await mongoSDK.services.auth.register({ request }),
		},
	},
});

import { createFileRoute } from "@tanstack/react-router";
import { middlewares } from "#/libs/server/middlewares";
import { mongoSDK } from "#/libs/server/sdk/mongodb";

export const Route = createFileRoute("/api/v1/register")({
	server: {
		middleware: [middlewares.csrf],
		handlers: {
			POST: async ({ request }) => mongoSDK.services.auth.register({ request }),
		},
	},
});

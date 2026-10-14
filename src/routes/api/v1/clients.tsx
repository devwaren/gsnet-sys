import { createFileRoute } from "@tanstack/react-router";
import { middlewares } from "#/libs/server/middlewares";
import { mongoSDK } from "#/libs/server/sdk/mongodb";

export const Route = createFileRoute("/api/v1/clients")({
	server: {
		middleware: [middlewares.csrf],
		handlers: {
			GET: () => mongoSDK.services.clients.get(),
			POST: async ({ request }) => mongoSDK.services.clients.add({ request }),
		},
	},
});

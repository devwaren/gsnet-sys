import { createFileRoute } from "@tanstack/react-router";
import { mongoSDK } from "#/libs/server/sdk/mongodb";

export const Route = createFileRoute("/api/v1/login")({
	server: {
		handlers: {
			POST: async ({ request }) => mongoSDK.services.auth.login({ request }),
		},
	},
});

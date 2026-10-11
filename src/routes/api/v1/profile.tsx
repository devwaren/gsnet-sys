import { createFileRoute } from "@tanstack/react-router";
import { mongoSDK } from "#/libs/server/sdk/mongodb";

export const Route = createFileRoute("/api/v1/profile")({
	server: {
		handlers: {
			GET: async () => await mongoSDK.services.auth.getProfile(),
		},
	},
});

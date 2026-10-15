import { createFileRoute } from "@tanstack/react-router";
import { TokenSDK } from "#/libs/server/sdk/token";

export const Route = createFileRoute("/api/v1/token")({
	server: {
		handlers: {
			GET: async () => await TokenSDK.services.getJWT(),
		},
	},
});

import { createFileRoute } from "@tanstack/react-router";
import { mongoSDK } from "#/libs/server/sdk/mongodb";

export const Route = createFileRoute("/api/v1/profile")({
	server: {
		handlers: {
			GET: async () => {
				const res = await mongoSDK.services.auth.profile();
				return Response.json(res);
			},
		},
	},
});

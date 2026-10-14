import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { mongodbSDKClient } from "#/libs/client/sdk/mongodb";
import { middlewares } from "#/libs/server/middlewares";

export const Route = createFileRoute("/dashboard/admin")({
	loader: async () => {
		const result = await mongodbSDKClient.services.auth.verifyAdmin();

		if (!result.authorized) {
			throw redirect({
				to: result.reason === "unauthenticated" ? "/" : "/dashboard",
			});
		}
	},
	component: () => <Outlet />,
	server: {
		middleware: [middlewares.role],
	},
});

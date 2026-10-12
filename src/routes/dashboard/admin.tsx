import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { services } from "#/libs/client/services";
import { middlewares } from "#/libs/server/middlewares";

export const Route = createFileRoute("/dashboard/admin")({
	loader: async () => {
		const result = await services.auth.verifyAdmin();

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

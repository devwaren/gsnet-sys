import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { middlewares } from "#/libs/server/middlewares";
import { checkAdmin } from "#/libs/server/sdk/mongodb/services/auth/role";

export const Route = createFileRoute("/dashboard/admin")({
	loader: async () => {
		const result = await checkAdmin();

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

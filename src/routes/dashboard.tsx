import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { mongodbSDKClient } from "#/libs/client/sdk/mongodb";
import { middlewares } from "#/libs/server/middlewares";
import { DashboardLayout } from "#/shared/layouts";
import { styles } from "#/shared/styles";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,

	loader: async () => {
		const authorization =
			await mongodbSDKClient.services.auth.getAuthorization();

		if (!authorization) {
			throw redirect({ to: "/" });
		}

		return authorization;
	},

	server: {
		middleware: [middlewares.auth],
	},
});

function RouteComponent() {
	return (
		<DashboardLayout className={styles.layout()}>
			<Outlet />
		</DashboardLayout>
	);
}

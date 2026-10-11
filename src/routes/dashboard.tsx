import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { middlewares } from "#/libs/server/middlewares";
import { mongoSDK } from "#/libs/server/sdk/mongodb";
import { DashboardLayout } from "#/shared/layouts";
import { styles } from "#/shared/styles";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,

	loader: async () => {
		const session = await mongoSDK.services.auth.getSession();

		if (!session) {
			throw redirect({ to: "/" });
		}

		const role = await mongoSDK.services.auth.getRole({ data: session.userId });

		if (role !== "admin") {
			throw redirect({ to: "/" });
		}

		const profile = await mongoSDK.services.auth.getProfile();

		if (!profile) {
			throw redirect({ to: "/" });
		}

		return { role, profile };
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

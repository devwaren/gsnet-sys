import { createFileRoute, Outlet } from "@tanstack/react-router";
import { middlewares } from "#/libs/server/middlewares";
import { AuthLayout } from "#/shared/layouts";

export const Route = createFileRoute("/auth")({
	component: RouteComponent,
	server: {
		middleware: [middlewares.publicRoute],
	},
});

function RouteComponent() {
	return (
		<AuthLayout>
			<Outlet />
		</AuthLayout>
	);
}

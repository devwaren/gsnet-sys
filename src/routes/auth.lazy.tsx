import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { AuthLayout } from "#/shared/layouts";

export const Route = createLazyFileRoute("/auth")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<AuthLayout>
			<Outlet />
		</AuthLayout>
	);
}

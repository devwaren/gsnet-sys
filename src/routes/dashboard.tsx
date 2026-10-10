import { createFileRoute, Outlet } from "@tanstack/react-router";
import { middlewares } from "#/libs/server/middlewares";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
	server: {
		middleware: [middlewares.auth],
	},
});

function RouteComponent() {
	return <Outlet />;
}

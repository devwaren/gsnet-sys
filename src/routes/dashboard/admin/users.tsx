import { createFileRoute } from "@tanstack/react-router";
import { UsersPage } from "#/pages/dashboard/admin";

export const Route = createFileRoute("/dashboard/admin/users")({
	component: RouteComponent,
});

function RouteComponent() {
	return <UsersPage />;
}

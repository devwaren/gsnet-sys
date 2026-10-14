import { createFileRoute } from "@tanstack/react-router";
import { AdminClientsPage } from "#/pages/dashboard/admin";

export const Route = createFileRoute("/dashboard/admin/clients")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AdminClientsPage />;
}

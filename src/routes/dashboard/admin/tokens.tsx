import { createFileRoute } from "@tanstack/react-router";
import { CreateTokenPage } from "#/pages/dashboard/admin";

export const Route = createFileRoute("/dashboard/admin/tokens")({
	component: RouteComponent,
});

function RouteComponent() {
	return <CreateTokenPage />;
}

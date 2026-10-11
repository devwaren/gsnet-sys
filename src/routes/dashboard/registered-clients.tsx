import { createFileRoute } from "@tanstack/react-router";
import { RegisteredClientPage } from "#/pages/dashboard/clients";

export const Route = createFileRoute("/dashboard/registered-clients")({
	component: RouteComponent,
});

function RouteComponent() {
	return <RegisteredClientPage />;
}

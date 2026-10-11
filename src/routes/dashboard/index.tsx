import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "#/pages/dashboard";

export const Route = createFileRoute("/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <HomePage />;
}

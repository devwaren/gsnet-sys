import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "#/pages/dashboard/settings";

export const Route = createFileRoute("/dashboard/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return <SettingsPage />;
}

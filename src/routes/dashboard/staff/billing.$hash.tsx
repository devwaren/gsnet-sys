import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/staff/billing/$hash")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/dashboard/staff/billing/$hash"!</div>;
}

import { createFileRoute } from "@tanstack/react-router";
import { BillingPage } from "#/pages/dashboard/staff";

export const Route = createFileRoute("/dashboard/staff/billing")({
	component: RouteComponent,
});

function RouteComponent() {
	return <BillingPage />;
}

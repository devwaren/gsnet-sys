import { createFileRoute } from "@tanstack/react-router";
import { InvoicesPage } from "#/pages/dashboard/staff";

export const Route = createFileRoute("/dashboard/staff/invoices")({
	component: RouteComponent,
});

function RouteComponent() {
	return <InvoicesPage />;
}

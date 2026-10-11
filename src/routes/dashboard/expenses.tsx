import { createFileRoute } from "@tanstack/react-router";
import { ExpensesPage } from "#/pages/dashboard/expenses";

export const Route = createFileRoute("/dashboard/expenses")({
	component: RouteComponent,
});

function RouteComponent() {
	return <ExpensesPage />;
}

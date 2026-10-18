import { createFileRoute } from "@tanstack/react-router";
import { queries } from "#/libs/client/queries";
import { UsersPage } from "#/pages/dashboard/admin";

export const Route = createFileRoute("/dashboard/admin/users")({
	component: RouteComponent,
	loader: async ({ context }) =>
		await context.queryClient.query(queries.users.get),
});

function RouteComponent() {
	return <UsersPage />;
}

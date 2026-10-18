import { createFileRoute } from "@tanstack/react-router";
import { queries } from "#/libs/client/queries";
import { RegisteredClientPage } from "#/pages/dashboard/clients";

export const Route = createFileRoute("/dashboard/clients")({
	component: RouteComponent,

	loader: async ({ context }) => {
		await context.queryClient.query(queries.client.get);
	},
});

function RouteComponent() {
	return <RegisteredClientPage />;
}

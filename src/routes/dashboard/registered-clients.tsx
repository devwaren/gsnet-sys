import { createFileRoute } from "@tanstack/react-router";
import { queries } from "#/libs/client/queries";
import { RegisteredClientPage } from "#/pages/dashboard/clients";

export const Route = createFileRoute("/dashboard/registered-clients")({
	component: RouteComponent,

	loader: ({ context }) => context.queryClient.query(queries.client.get),
});

function RouteComponent() {
	return <RegisteredClientPage />;
}

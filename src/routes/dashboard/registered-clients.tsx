import { createFileRoute } from "@tanstack/react-router";
import { queries } from "#/libs/client/queries";
import { RegisteredClientPage } from "#/pages/dashboard/clients";

export const Route = createFileRoute("/dashboard/registered-clients")({
	component: RouteComponent,

	loader: async ({ context }) => {
		return context.queryClient.ensureQueryData(queries.client.get);
	},
});

function RouteComponent() {
	return <RegisteredClientPage />;
}

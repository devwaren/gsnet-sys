import { createFileRoute } from "@tanstack/react-router";
import { middlewares } from "#/libs/server/middlewares";
import { LoginPage } from "#/pages/auth/login";
import { AuthLayout } from "#/shared/layouts";

export const Route = createFileRoute("/")({
	component: Home,
	server: {
		middleware: [middlewares.publicRoute],
	},
});

function Home() {
	return (
		<AuthLayout>
			<LoginPage />
		</AuthLayout>
	);
}

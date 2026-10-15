import { createFileRoute } from "@tanstack/react-router";
import RegisterPage from "#/pages/auth/register/register-page";

export const Route = createFileRoute("/register")({
	component: RouteComponent,
});

function RouteComponent() {
	return <RegisterPage />;
}

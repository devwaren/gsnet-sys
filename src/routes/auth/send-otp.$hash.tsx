import { createFileRoute } from "@tanstack/react-router";
import SendOtpPage from "#/pages/auth/send-otp/send-otp-page";

export const Route = createFileRoute("/auth/send-otp/$hash")({
	component: RouteComponent,
});

function RouteComponent() {
	return <SendOtpPage />;
}

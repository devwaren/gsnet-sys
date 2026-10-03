import { createFileRoute } from "@tanstack/react-router";
import { middlewares } from "#/libs/server/middlewares";

export const Route = createFileRoute("/api")({
	server: {
		middleware: [middlewares.internal],
	},
});

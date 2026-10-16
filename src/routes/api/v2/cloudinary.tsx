import { createFileRoute } from "@tanstack/react-router";
import { middlewares } from "#/libs/server/middlewares";
import { cloudinarySDK } from "#/libs/server/sdk/cloudinary";

export const Route = createFileRoute("/api/v2/cloudinary")({
	server: {
		middleware: [middlewares.csrf],
		handlers: {
			POST: ({ request }) => cloudinarySDK.upload({ request }),
			DELETE: ({ request }) => cloudinarySDK.remove({ request }),
		},
	},
});

import { createMiddleware } from "@tanstack/react-start";
import { mongoSDK } from "#/libs/server/sdk/mongodb";

const csrf = createMiddleware().server(async ({ request, next }) => {
	if (request.method !== "POST") {
		return next();
	}

	const nextToken = await mongoSDK.services.auth.csrf({ request });

	return next({
		context: {
			csrfToken: nextToken,
		},
	});
});

export { csrf };

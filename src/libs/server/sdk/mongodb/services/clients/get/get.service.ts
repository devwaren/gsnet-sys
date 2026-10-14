import { createServerOnlyFn } from "@tanstack/react-start";
import { http } from "#/libs/server/constants";
import { collections } from "#/libs/server/sdk/mongodb/collections";
import { server } from "#/libs/server/utils";

export const get = createServerOnlyFn(async () => {
	try {
		const result = await collections.clients.all({
			sortBy: "created_at",
			limit: 0,
		});

		if (!result || result.length === 0) {
			return Response.json(
				{
					success: false,
					message: "No client data found.",
					statusText: http.responses.status[404],
					data: [],
				},
				{ status: 404 },
			);
		}

		const data = result.map(
			({ _id, created_at, updated_at, ...client }) => client,
		);

		return Response.json(
			{
				success: true,
				message: "Client data retrieved successfully.",
				statusText: http.responses.status[200],
				data,
			},
			{ status: 200 },
		);
	} catch (err) {
		server.error(err);
		return Response.json(
			{
				success: false,
				message: "Failed to retrieve client data.",
				statusText: http.responses.status[500],
			},
			{ status: 500 },
		);
	}
});

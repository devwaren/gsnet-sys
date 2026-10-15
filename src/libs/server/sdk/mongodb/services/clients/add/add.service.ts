import { createServerOnlyFn } from "@tanstack/react-start";
import { http } from "#/libs/server/constants";
import { gen } from "#/libs/server/gen";
import { invalid } from "#/libs/server/res";
import { collections } from "#/libs/server/sdk/mongodb/collections";
import { schema } from "#/libs/shared/validations";

export const add = createServerOnlyFn(
	async ({ request }: { request: Request }) => {
		const body = await request.json();

		const result = schema.customer.client.safeParse(body);

		if (!result.success) return invalid();

		const { firstName, lastName, email } = result.data;

		const isClientExists = await collections.clients.findOne({ email });

		if (isClientExists) {
			return Response.json(
				{
					success: false,
					message: "This email is already registered.",
					statusText: http.responses.status[409],
				},
				{ status: 409 },
			);
		}

		const pppoeId = gen.pppoeId(firstName, lastName);

		await collections.clients.create({
			...result.data,
			pppoeId,
		});

		return Response.json(
			{
				success: true,
				message: "Client successfully registered.",
				statusText: http.responses.status[201],
			},
			{ status: 201 },
		);
	},
);

import { schema } from "#/libs/shared/schema";

const addClient = async (data: unknown) => {
	const result = schema.customer.client.safeParse(data);

	if (!result) return;

	return result.data;
};

export const validate = {
	addClient,
};

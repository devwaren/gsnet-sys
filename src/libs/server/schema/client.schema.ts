import { objectId, sanitize } from "@dev-waren/mongodb";
import { z } from "@dev-waren/react-form-kit";
import { schema } from "#/libs/shared/schema";

export const clientId = z.object({
	_id: objectId,
	pppoeId: z
		.string()
		.trim()
		.min(1, { message: "PPPoE ID is required." })
		.transform(sanitize),
});

export const client = clientId.merge(schema.customer.client);

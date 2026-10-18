import { objectId, sanitize, z } from "@dev-waren/mongodb";
import { schema } from "#/libs/shared/validations";

const userId = z.object({
	_id: objectId,
	displayName: z.string().transform(sanitize),
});

export const user = userId.merge(schema.auth.users);

import { objectId, z } from "@dev-waren/mongodb";
import { schema } from "#/libs/shared/schema";

const tokenId = z.object({
	_id: objectId,
});

export const adminToken = tokenId.merge(schema.admin.token);

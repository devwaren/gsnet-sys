import { objectId, z } from "@dev-waren/mongodb";
import { schema } from "#/libs/shared/validations";

const planId = z.object({
	_id: objectId,
});

export const internetPlan = planId.merge(schema.internetPlan);

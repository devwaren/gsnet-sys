import type { z } from "@dev-waren/react-form-kit";
import type { schema } from "#/libs/shared/schema";

type InternetPlan = z.infer<typeof schema.internetPlan>;

export type Schema = {
	create: InternetPlan;
	update: Partial<InternetPlan>;
	params: Pick<InternetPlan, "name" | "slug" | "status">;
};

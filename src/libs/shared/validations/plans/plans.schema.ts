import { z } from "@dev-waren/react-form-kit";

export const internetPlan = z.object({
	name: z.string().min(3, "Plan name must be at least 3 characters").max(100),

	slug: z.string().min(3).max(120),

	description: z.string().max(500).optional(),

	speed: z.object({
		downloadMbps: z.number().positive(),
		uploadMbps: z.number().positive(),
	}),

	price: z.number().nonnegative(),

	currency: z.string().length(3).default("PHP"),

	billingCycle: z.enum(["monthly", "quarterly", "semi-annually", "annually"]),

	dataCap: z
		.object({
			limitGB: z.number().positive().nullable(),
			unlimited: z.boolean().default(false),
		})
		.optional(),

	features: z.array(z.string()).default([]),

	status: z.enum(["draft", "active", "inactive", "archived"]).default("draft"),

	isPopular: z.boolean().default(false),

	installationFee: z.number().nonnegative().default(0),
});

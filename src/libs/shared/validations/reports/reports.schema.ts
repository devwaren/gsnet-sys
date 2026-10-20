import { sanitize, z } from "@dev-waren/react-form-kit";

export const reports = z.object({
	title: z
		.string()
		.min(1, {
			message: "Report title is required.",
		})
		.transform(sanitize),

	desc: z
		.string()
		.min(50, {
			message: "Report description must be at least 50 characters long.",
		})
		.transform(sanitize),

	status: z.enum(["under review", "under investigation", "case closed"]),

	pppoeId: z
		.string()
		.min(1, {
			message: "PPPoE ID is required.",
		})
		.transform(sanitize),

	caseDate: z.date({
		message: "A valid case date is required.",
	}),

	caseTime: z.date({
		message: "A valid case time is required.",
	}),
});

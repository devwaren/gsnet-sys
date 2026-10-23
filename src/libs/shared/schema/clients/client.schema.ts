import { intlDate, sanitize, z } from "@dev-waren/react-form-kit";

const address = z.object({
	zipCode: z.string().regex(/^\d{4}$/, {
		message: "Philippine ZIP code must be exactly 4 digits.",
	}),

	unit: z
		.string()
		.trim()
		.min(1, { message: "Unit/block is required." })
		.transform(sanitize),

	barangay: z
		.string()
		.trim()
		.min(1, { message: "Barangay is required." })
		.transform(sanitize),

	city: z
		.string()
		.trim()
		.min(1, { message: "City is required." })
		.transform(sanitize),

	country: z.literal("philippines"),
});

const installation = z.object({
	date: z
		.string({
			message: "A valid installation date is required.",
		})
		.regex(/^\d{4}-\d{2}-\d{2}$/, {
			message: "Installation date must use YYYY-MM-DD format.",
		})
		.default(intlDate),

	installer: z.enum(["levi gayanes", "rey pineda"], {
		message: "Please select a valid installer.",
	}),

	plan: z.enum(["plan-15mbps", "plan-30mbps", "plan-50mbps"], {
		message: "Please select a valid internet plan.",
	}),
});

export const client = z.object({
	firstName: z
		.string()
		.trim()
		.min(1, { message: "First name is required." })
		.transform(sanitize),

	lastName: z
		.string()
		.trim()
		.min(1, { message: "Last name is required." })
		.transform(sanitize),

	phone: z
		.string()
		.regex(/^09\d{9}$/, {
			message: "Enter a valid Philippine mobile number (e.g., 09171234567).",
		})
		.transform(sanitize),

	email: z
		.string()
		.trim()
		.email({ message: "Enter a valid email address." })
		.transform(sanitize),

	address,
	installation,
});

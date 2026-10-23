import { sanitize, z } from "@dev-waren/react-form-kit";

export const invoice = z.object({
	invoiceNumber: z.string().min(1, "Invoice number is required"),

	customerId: z.string().min(1, "Customer is required").transform(sanitize),
	customerName: z
		.string()
		.min(1, "Customer name is required")
		.transform(sanitize),

	items: z
		.array(
			z.object({
				description: z
					.string()
					.min(1, "Description is required")
					.transform(sanitize),
				quantity: z.number().int().positive(),
				unitPrice: z.number().nonnegative(),
				amount: z.number().nonnegative(),
			}),
		)
		.min(1, "At least one invoice item is required"),

	subtotal: z.number().nonnegative(),
	discount: z.number().min(0).default(0),
	tax: z.number().min(0).default(0),
	totalAmount: z.number().nonnegative(),

	issuedAt: z.coerce.date(),
	dueDate: z.coerce.date(),

	status: z
		.enum(["Draft", "Pending", "Paid", "Overdue", "Cancelled"])
		.default("Draft"),

	paymentMethod: z.enum(["Cash", "Bank Transfer", "GCash", "Other"]).optional(),

	notes: z.string().optional().transform(sanitize),
});

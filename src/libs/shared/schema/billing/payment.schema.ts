import { sanitize, z } from "@dev-waren/react-form-kit";

export const payment = z.object({
	paymentReference: z
		.string()
		.min(1, "Payment reference is required")
		.transform(sanitize),

	invoiceId: z.string().min(1, "Invoice is required").transform(sanitize),
	customerId: z.string().min(1, "Customer is required").transform(sanitize),

	amount: z.number().positive("Payment amount must be greater than zero"),

	paymentMethod: z.enum(["Cash", "Bank Transfer", "GCash", "Maya", "Other"]),

	status: z
		.enum(["Pending", "Completed", "Failed", "Refunded"])
		.default("Pending"),

	transactionId: z.string().optional(),

	paidAt: z.coerce.date().optional(),

	notes: z.string().optional().transform(sanitize),
});

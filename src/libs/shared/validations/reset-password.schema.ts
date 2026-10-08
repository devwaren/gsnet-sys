import { z } from "@dev-waren/react-form-kit";

const resetPassword = z
	.object({
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long." }),

		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match.",
		path: ["confirmPassword"],
	});

export { resetPassword };

import { sanitize, z } from "@dev-waren/react-form-kit";

export const otp = z.object({
	otp: z
		.string()
		.regex(/^\d{6}$/, {
			message: "OTP must be exactly 6 digits.",
		})
		.transform(sanitize),
});

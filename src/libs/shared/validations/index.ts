import { email, login, otp, register, resetPassword } from "./auth";
import { invoice, payment } from "./billing";

export const schema = {
	auth: {
		login,
		register,
		email,
		resetPassword,
		otp,
	},
	billing: {
		invoice,
		payment,
	},
};

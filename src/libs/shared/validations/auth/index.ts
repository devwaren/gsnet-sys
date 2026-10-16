import { email } from "./email.schema";
import { upload } from "./image.schema";
import { jwt } from "./jwt.schema";
import { login } from "./login.schema";
import { otp } from "./otp.schema";
import { register } from "./register.schema";
import { resetPassword } from "./reset-password.schema";

export const auth = {
	login,
	register,
	email,
	resetPassword,
	otp,
	jwt,
	upload,
};

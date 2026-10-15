import { getAuthorization } from "./authorization";
import { login } from "./login";
import { logout } from "./logout";
import { profile } from "./profile";
import { register } from "./register";
import { verifyAdmin } from "./role";
import { setRole } from "./setRole";

export const auth = {
	login,
	logout,
	profile,
	verifyAdmin,
	getAuthorization,
	setRole,
	register,
};

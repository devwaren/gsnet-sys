import { authorization } from "./auth/authorization";
import { login } from "./auth/login";
import { logout } from "./auth/logout";
import { profile } from "./auth/profile";
import { register } from "./auth/register";
import { checkAdmin, getUserRole } from "./auth/role";
import { session } from "./auth/session";

export const auth = {
	login,
	logout,
	register,
	profile,
	checkAdmin,
	getUserRole,
	session,
	authorization,
};

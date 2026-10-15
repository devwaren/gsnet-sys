import { authorization } from "./authorization";
import { csrf } from "./csrf";
import { login } from "./login";
import { logout } from "./logout";
import { profile } from "./profile";
import { register } from "./register";
import { checkAdmin, getUserRole, setRole } from "./role";
import { session } from "./session";

export const auth = {
	login,
	logout,
	register,
	profile,
	checkAdmin,
	getUserRole,
	setRole,
	session,
	authorization,
	csrf,
};

import { getAuthorization } from "./authorization";
import { login } from "./login";
import { logout } from "./logout";
import { profile } from "./profile";
import { verifyAdmin } from "./role";

export const auth = {
	login,
	logout,
	profile,
	verifyAdmin,
	getAuthorization,
};

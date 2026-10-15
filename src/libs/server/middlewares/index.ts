import { auth, authorization, publicRoute, role } from "./auth";
import { csrf } from "./csrf";
import { internal } from "./internal";

export const middlewares = {
	internal,
	csrf,
	auth,
	publicRoute,
	role,
	authorization,
};

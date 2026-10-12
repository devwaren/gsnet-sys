import { getAuthorization, login, logout, verifyAdmin } from "./auth";
import { remove, upload } from "./media";

const services = {
	auth: {
		login,
		logout,
		getAuthorization,
		verifyAdmin,
	},
	media: {
		upload,
		remove,
	},
};

export { services };

import { accounts } from "./accounts.schema";
import { clients } from "./clients.schema";
import { cloudinary, uploadFile } from "./cloudinary.schema";
import { csrf } from "./csrf.schema";
import { jwt } from "./jwt.schema";
import { roles } from "./roles.schema";
import { sessions } from "./sessions.schema";
import { user } from "./user.schema";

export const schemaServer = {
	accounts,
	sessions,
	user,
	roles,
	jwt,
	cloudinary,
	uploadFile,
	clients,
	csrf,
};

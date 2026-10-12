import { accounts } from "./accounts.schema";
import { cloudinary, uploadFile } from "./cloudinary.schema";
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
};

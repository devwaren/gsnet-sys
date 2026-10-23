import { accounts } from "./accounts.schema";
import { client } from "./client.schema";
import { cloudinary, uploadFile } from "./cloudinary.schema";
import { csrf } from "./csrf.schema";
import { internetPlan } from "./internetPlans.schema";
import { invoices } from "./invoices.schema";
import { roles } from "./roles.schema";
import { sessions } from "./sessions.schema";
import { adminToken } from "./token.schema";
import { user } from "./user.schema";

export const schemaServer = {
	accounts,
	sessions,
	user,
	roles,
	cloudinary,
	uploadFile,
	csrf,
	client,
	internetPlan,
	invoices,
	adminToken,
};

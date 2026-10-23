import type { FormField, z } from "@dev-waren/react-form-kit";
import type { schema } from "#/libs/shared/schema";

type Register = z.infer<typeof schema.auth.register>;

export const fields: FormField<Register>[] = [
	{
		name: "token",
		placeholder: "Enter Registration Token",
		type: "password",
		className: "col-span-2",
	},
	{
		name: "firstName",
		placeholder: "Enter Firstname",
		type: "text",
	},
	{
		name: "lastName",
		placeholder: "Enter Lastname",
		type: "text",
	},
	{
		name: "displayName",
		placeholder: "Enter Display name",
		type: "text",
		className: "col-span-2",
	},
	{
		name: "username",
		placeholder: "Enter username",
		type: "text",
		className: "col-span-2",
	},
	{
		name: "email",
		placeholder: "Enter email address",
		type: "email",
		className: "col-span-2",
	},
	{
		name: "password",
		placeholder: "Enter password",
		type: "password",
	},
	{
		name: "confirmPassword",
		placeholder: "Retype password",
		type: "password",
	},
];

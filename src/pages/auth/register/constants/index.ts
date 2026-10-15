import type { FormField } from "#/shared/types";

export const fields: FormField[] = [
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

import type { FormField } from "#/shared/types";

export const fields: FormField[] = [
	{
		name: "email",
		type: "email",
		placeholder: "Enter Email address",
	},
	{
		name: "role",
		type: "select",
		items: [
			{ label: "admin", value: "admin" },
			{ label: "staff", value: "staff" },
			{ label: "user", value: "user" },
		],
	},
	{
		name: "token",
		className: "col-span-2 text-gray-400 trim select-none disabled:select-none",
		placeholder: "Press Generate JWT",
		type: "inputgen",
		disabled: true,
	},
];

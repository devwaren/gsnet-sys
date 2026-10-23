import type { FormField, z } from "@dev-waren/react-form-kit";
import type { schema } from "#/libs/shared/schema";

type Token = z.infer<typeof schema.admin.token>;

export const fields: FormField<Token>[] = [
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

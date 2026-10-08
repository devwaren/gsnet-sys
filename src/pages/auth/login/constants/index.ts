import type { FormField } from "#/shared/types";

const formFields: FormField[] = [
	{
		name: "email",
		type: "email",
		placeholder: "Enter your email",
		className: "col-span-2",
	},
	{
		name: "password",
		type: "password",
		placeholder: "Enter your password",
		className: "col-span-2",
	},
];

export { formFields };

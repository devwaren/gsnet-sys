import type { FormField, z } from "@dev-waren/react-form-kit";
import type { schema } from "#/libs/shared/schema";

type Login = z.infer<typeof schema.auth.login>;

const formFields: FormField<Login>[] = [
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

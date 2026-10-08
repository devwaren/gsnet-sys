import { useFormSettings } from "@dev-waren/react-form-kit/hook-form";
import { client } from "#/libs/client/utils";
import { schema } from "#/libs/shared/validations";
import { useForgotPasswordEntry } from "./useForgotPasswordEntry";

const useForgotPasswordForm = () => {
	const mutation = useForgotPasswordEntry();

	const form = useFormSettings({
		schema: schema.email,
		defaultValues: {
			email: "",
		},
		onSubmit: (data) => {
			client.log("passed data", data);
		},
	});

	return { form, isPending: mutation.isPending };
};

export { useForgotPasswordForm };

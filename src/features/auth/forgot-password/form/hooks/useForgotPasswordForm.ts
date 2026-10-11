import { useFormSettings } from "@dev-waren/react-form-kit/hook-form";
import { client } from "#/libs/client/utils";
import { schema } from "#/libs/shared/validations";
import { usePending } from "#/shared/hooks";
import { useForgotPasswordEntry } from "./useForgotPasswordEntry";

const useForgotPasswordForm = () => {
	const mutation = useForgotPasswordEntry();
	usePending(mutation.isPending);

	const form = useFormSettings({
		schema: schema.auth.email,
		defaultValues: {
			email: "",
		},
		onSubmit: (data) => {
			client.log("passed data", data);
		},
	});

	return { form };
};

export { useForgotPasswordForm };

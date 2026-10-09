import { useFormSettings } from "@dev-waren/react-form-kit/hook-form";
import { client } from "#/libs/client/utils";
import { schema } from "#/libs/shared/validations";
import { usePending } from "#/shared/hooks";
import { useResetPasswordEntry } from "./useResetPasswordEntry";

const useResetPasswordForm = () => {
	const mutation = useResetPasswordEntry();
	usePending(mutation.isPending);

	const form = useFormSettings({
		schema: schema.resetPassword,
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
		clearFields: ["password", "confirmPassword"],
		onSubmit: (data) => {
			client.log("passed data :", data);
		},
	});

	return { form, isPending: mutation.isPending };
};

export { useResetPasswordForm };

import { useFormSettings } from "@dev-waren/react-form-kit/hook-form";
import { client } from "#/libs/client/utils";
import { schema } from "#/libs/shared/validations";

const useChangePasswordForm = () => {
	return useFormSettings({
		schema: schema.auth.resetPassword,
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
		onSubmit: (data) => {
			client.log(data);
		},
	});
};

export { useChangePasswordForm };

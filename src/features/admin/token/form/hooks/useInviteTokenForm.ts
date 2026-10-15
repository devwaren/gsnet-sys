import { useFormSettings } from "@dev-waren/react-form-kit/hook-form";
import { client } from "#/libs/client/utils";
import { schema } from "#/libs/shared/validations";

const useInviteTokenForm = () => {
	return useFormSettings({
		schema: schema.admin.token,
		defaultValues: {
			email: "",
			token: "",
		},
		clearFields: ["email", "token"],
		onSubmit: () => {
			client.log("validation passed.");
		},
	});
};

export { useInviteTokenForm };

import { useFormSettings } from "@dev-waren/react-form-kit/hook-form";
import { client } from "#/libs/client/utils";
import { schema } from "#/libs/shared/validations";
import { usePending } from "#/shared/hooks";
import { useRegisterEntry } from "./useRegisterEntry";

const useRegisterForm = () => {
	const mutation = useRegisterEntry();
	usePending(mutation.isPending);

	const form = useFormSettings({
		schema: schema.auth.register,
		defaultValues: {
			token: "",
			firstName: "",
			lastName: "",
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
			avatar: "none",
		},
		onSubmit: (data) => {
			client.log("validate success.");
			mutation.mutate({ data });
		},
	});

	return { form };
};

export { useRegisterForm };

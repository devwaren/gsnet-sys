import { useFormSettings } from "@dev-waren/react-form-kit/hook-form";
import { client } from "#/libs/client/utils";
import { schema } from "#/libs/shared/validations";
import { usePending } from "#/shared/hooks";
import { useRegisterEntry } from "./useRegisterEntry";

const useRegisterForm = () => {
	const mutation = useRegisterEntry();
	usePending(mutation.isPending);

	const form = useFormSettings({
		schema: schema.register,
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			address: "",
			password: "",
			confirmPassword: "",
		},
		onSubmit: (data) => {
			client.log(data);
		},
	});

	return { form };
};

export { useRegisterForm };

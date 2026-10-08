import { useFormSettings } from "@dev-waren/react-form-kit/hook-form";
import { client } from "#/libs/client/utils";
import { schema } from "#/libs/shared/validations";
import { useRegisterEntry } from "./useRegisterEntry";

const useRegisterForm = () => {
	const mutation = useRegisterEntry();

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

	return { form, isPending: mutation.isPending };
};

export { useRegisterForm };

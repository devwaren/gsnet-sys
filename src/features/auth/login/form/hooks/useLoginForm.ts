import { useFormSettings } from "@dev-waren/react-form-kit/hook-form";
import { client } from "#/libs/client/utils";
import { schema } from "#/libs/shared/validations";
import { useLoginEntry } from "./useLoginEntry";

const useLoginForm = () => {
	const mutation = useLoginEntry();

	const form = useFormSettings({
		schema: schema.login,
		defaultValues: {
			email: "",
			password: "",
		},
		clearFields: ["email", "password"],
		onSubmit: (data) => {
			client.log("[validation] passed!");

			mutation.mutate({ data });
		},
	});

	return { form, isPending: mutation.isPending };
};

export { useLoginForm };

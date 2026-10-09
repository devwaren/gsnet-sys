import { useFormSettings } from "@dev-waren/react-form-kit/hook-form";
import { client } from "#/libs/client/utils";
import { schema } from "#/libs/shared/validations";
import { usePending } from "#/shared/hooks";
import { useLoginEntry } from "./useLoginEntry";

const useLoginForm = () => {
	const mutation = useLoginEntry();
	usePending(mutation.isPending);

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

	return { form };
};

export { useLoginForm };

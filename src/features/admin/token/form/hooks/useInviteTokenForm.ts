import { useFormSettings } from "@dev-waren/react-form-kit/hook-form";
import { client } from "#/libs/client/utils";
import { schema } from "#/libs/shared/schema";
import { useInviteTokenEntry } from "./useInviteTokenEntry";

const useInviteTokenForm = () => {
	const mutation = useInviteTokenEntry();

	return useFormSettings({
		schema: schema.admin.token,
		defaultValues: {
			email: "",
			token: "",
		},
		clearFields: ["email", "token"],
		onSubmit: (data) => {
			client.log("validation passed.");
			mutation.mutate({ data });
		},
	});
};

export { useInviteTokenForm };

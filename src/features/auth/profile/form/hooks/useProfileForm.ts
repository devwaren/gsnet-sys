import { useFormSettings } from "@dev-waren/react-form-kit/hook-form";
import { client } from "#/libs/client/utils";
import { schema } from "#/libs/shared/schema";
import { useSession } from "#/shared/hooks";

const useProfileForm = () => {
	const { profile } = useSession();

	return useFormSettings({
		schema: schema.auth.register,
		defaultValues: {
			firstName: profile.firstName,
			lastName: profile.lastName,
			email: profile.email,
		},
		onSubmit: (data) => {
			client.log("submitted data :", data);
		},
	});
};

export { useProfileForm };

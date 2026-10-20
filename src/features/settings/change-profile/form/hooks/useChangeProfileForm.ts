import { useFormSettings } from "@dev-waren/react-form-kit/hook-form";
import { schema } from "#/libs/shared/validations";
import { useUploadAttachmentEntry } from "./useChangeProfileEntry";

const useUploadAttachmentForm = () => {
	const mutation = useUploadAttachmentEntry();

	return useFormSettings({
		schema: schema.auth.upload,
		onSubmit: async (data) => {
			await mutation.mutateAsync({ data });
		},
	});
};

export { useUploadAttachmentForm };

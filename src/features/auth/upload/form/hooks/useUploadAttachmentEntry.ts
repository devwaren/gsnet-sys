import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { cloudinarySDKClient } from "#/libs/client/sdk/cloudinary";
import { client } from "#/libs/client/utils";

const useUploadAttachmentEntry = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationKey: ["upload", "avatar"],
		mutationFn: cloudinarySDKClient.services.upload,

		onSuccess: async (data) => {
			if (!data.success) {
				client.error(data.message);
				return;
			}

			await router.invalidate();

			await queryClient.invalidateQueries({
				queryKey: ["profile"],
			});

			client.log("Profile updated successfully.");
		},
	});
};

export { useUploadAttachmentEntry };

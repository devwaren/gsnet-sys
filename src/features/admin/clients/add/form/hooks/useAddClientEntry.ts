import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { mongodbSDKClient } from "#/libs/client/sdk/mongodb";
import { useModalStore } from "#/shared/store/modal";
import { usePendingStore } from "#/shared/store/pending";

export const useAddClientEntry = () => {
	const router = useRouter();
	const { setIsModal } = useModalStore();
	const { setIsPending } = usePendingStore();

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: mongodbSDKClient.services.clients.add,

		onSuccess: async (result) => {
			if (!result.success) return;

			setIsPending(true);
			queryClient.invalidateQueries({ queryKey: ["registered"] });
			await router.invalidate();
			setIsModal(false);
		},
	});

	return {
		...mutation,
	};
};

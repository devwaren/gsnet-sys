import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mongodbSDKClient } from "#/libs/client/sdk/mongodb";
import { client } from "#/libs/client/utils";
import { useErrorStore } from "#/shared/store/error";

const useAddClientEntry = () => {
	const queryClient = useQueryClient();
	const { setError } = useErrorStore();

	return useMutation({
		mutationKey: ["add-client"],
		mutationFn: mongodbSDKClient.services.clients.add,

		onSuccess: async (data) => {
			if (!data.success) {
				setError(String(data.message));
				return;
			}

			client.log("[ADD CLIENT] Success:", data.success);

			await queryClient.invalidateQueries({
				queryKey: ["registered-client"],
				exact: true,
			});

			client.log({ message: data.message });
		},
	});
};

export { useAddClientEntry };

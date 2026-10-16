import { useMutation, useQuery } from "@tanstack/react-query";
import { queries } from "#/libs/client/queries";
import { mongodbSDKClient } from "#/libs/client/sdk/mongodb";
import { client } from "#/libs/client/utils";
import { useErrorStore } from "#/shared/store/error";

const useAddClientEntry = () => {
	const { setError } = useErrorStore();

	const { refetch } = useQuery(queries.client.get);

	return useMutation({
		mutationKey: ["add-client"],
		mutationFn: mongodbSDKClient.services.clients.add,

		onSuccess: async (data) => {
			if (!data.success) {
				setError(String(data.message));
				return;
			}

			client.log("[ADD CLIENT] Success:", data.success);

			if (data.success) refetch();
		},

		onError: (error) => {
			setError(error.message);
		},
	});
};

export { useAddClientEntry };

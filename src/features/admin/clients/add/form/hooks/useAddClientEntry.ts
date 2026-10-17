import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { queries } from "#/libs/client/queries";
import { mongodbSDKClient } from "#/libs/client/sdk/mongodb";

export const useAddClientEntry = () => {
	const router = useRouter();

	const clientQuery = useQuery(queries.client.get);

	const mutation = useMutation({
		mutationFn: mongodbSDKClient.services.clients.add,

		onSuccess: async (result) => {
			if (!result.success) return;

			await new Promise((resolve) => setTimeout(resolve, 5000));

			await clientQuery.refetch();
			await router.invalidate();
		},
	});

	return {
		...mutation,
		refetch: clientQuery.refetch,
	};
};

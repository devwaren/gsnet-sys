import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { mongodbSDKClient } from "#/libs/client/sdk/mongodb";
import { client } from "#/libs/client/utils";

const useLogout = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationKey: ["logout"],
		mutationFn: mongodbSDKClient.services.auth.logout,
		onSuccess: (data) => {
			if (!data.success) {
				client.error({ message: data.message });
				return;
			}

			navigate({ to: "/" });

			client.info({ message: data.message });
		},
	});
};

export { useLogout };

import { useMutation } from "@tanstack/react-query";
import { mongodbSDKClient } from "#/libs/client/sdk/mongodb";
import { client } from "#/libs/client/utils";

const useInviteTokenEntry = () =>
	useMutation({
		mutationKey: ["register-role"],
		mutationFn: mongodbSDKClient.services.auth.setRole,
		onSuccess: (data) => {
			if (!data?.success) {
				client.error(data?.message);

				return;
			}

			client.log(data.message);
		},
	});

export { useInviteTokenEntry };

import { useMutation } from "@tanstack/react-query";
import { mongodbSDKClient } from "#/libs/client/sdk/mongodb";
import { client } from "#/libs/client/utils";
import { useErrorStore } from "#/shared/store/error";
import { useMessageStore } from "#/shared/store/message";

const useInviteTokenEntry = () => {
	const { setMessage } = useMessageStore();
	const { setError } = useErrorStore();

	return useMutation({
		mutationKey: ["register-role"],
		mutationFn: mongodbSDKClient.services.auth.setRole,
		onSuccess: (data) => {
			if (!data?.success) {
				client.error(data?.message);
				setError(String(data?.message));
				return;
			}

			client.log(data.message);
			setMessage(data.message);
		},
	});
};

export { useInviteTokenEntry };

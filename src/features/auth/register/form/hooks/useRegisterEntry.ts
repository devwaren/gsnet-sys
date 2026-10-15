import { useMutation } from "@tanstack/react-query";
import { mongodbSDKClient } from "#/libs/client/sdk/mongodb";
import { useErrorStore } from "#/shared/store/error";
import { useMessageStore } from "#/shared/store/message";

const useRegisterEntry = () => {
	const { setError } = useErrorStore();
	const { setMessage } = useMessageStore();

	return useMutation({
		mutationKey: ["register-user"],
		mutationFn: mongodbSDKClient.services.auth.register,
		onSuccess: (data) => {
			if (!data?.success) {
				setError(String(data?.message));
				return;
			}
			setMessage(data.message);
		},
	});
};

export { useRegisterEntry };

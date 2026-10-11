import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { services } from "#/libs/client/services";
import { client } from "#/libs/client/utils";

const useLogout = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationKey: ["logout"],
		mutationFn: services.auth.logout,
		onSuccess: (data) => {
			if (data.success) {
				client.error({ message: data.message });
				navigate({ to: "/" });
			}

			client.info({ message: data.message });
		},
	});
};

export { useLogout };

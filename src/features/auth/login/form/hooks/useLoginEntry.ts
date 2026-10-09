import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { services } from "#/libs/client/services";
import { client } from "#/libs/client/utils";
import { useErrorStore } from "#/shared/store/error";

const useLoginEntry = () => {
	const { setError } = useErrorStore();

	const navigate = useNavigate();

	return useMutation({
		mutationKey: ["login"],
		mutationFn: services.auth.login,

		onSuccess: (data) => {
			if (!data.success) {
				client.log("Login error:", {
					message: data.message,
					statusText: data.statusText,
				});

				setError(data.message);

				return;
			}

			client.log("Login success:", {
				message: data.message,
				statusText: data.statusText,
			});

			navigate({ to: "/dashboard" });
		},

		onError: (error) => {
			client.error("Mutation error:", error);
		},
	});
};

export { useLoginEntry };

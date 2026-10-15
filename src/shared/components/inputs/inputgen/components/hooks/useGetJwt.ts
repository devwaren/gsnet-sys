import { useSuspenseQuery } from "@tanstack/react-query";
import { tokenSDKClient } from "#/libs/client/sdk/token";

const useGetJwt = () => {
	return useSuspenseQuery({
		queryKey: ["token", "jwt"],
		queryFn: tokenSDKClient.services.getJWT,
		staleTime: 0,
	});
};

export { useGetJwt };

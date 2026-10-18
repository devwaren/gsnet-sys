import { queryOptions } from "@tanstack/react-query";
import { mongodbSDKClient } from "#/libs/client/sdk/mongodb";

export const get = queryOptions({
	queryKey: ["registered"],
	queryFn: mongodbSDKClient.services.clients.get,
	staleTime: 0,
});

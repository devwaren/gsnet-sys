import { queryOptions } from "@tanstack/react-query";
import { mongodbSDKClient } from "#/libs/client/sdk/mongodb";

export const get = queryOptions({
	queryKey: ["invoices", "list"],
	queryFn: mongodbSDKClient.services.invoices.get,
});

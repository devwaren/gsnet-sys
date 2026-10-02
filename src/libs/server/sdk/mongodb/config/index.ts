import { mongo } from "@dev-waren/mongodb";
import { env } from "#/libs/server/env";

const { collection } = await mongo.create({
	uri: env.sdk.mongoDB.uri,
	database: env.sdk.mongoDB.database,
	message: {
		success: "MongoDB Connected Successfully.",
		failure: "MongoDB Connection failed.",
	},
});

export { collection };

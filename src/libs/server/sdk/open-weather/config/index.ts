import { weatherAPI } from "@dev-waren/weather-api";
import { env } from "#/libs/server/env";

const weather = weatherAPI.create({
	apiKey: env.sdk.weatherApi.apiKey,
});

export { weather };

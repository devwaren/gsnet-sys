import { setEnv } from "@dev-waren/mongodb";

export const env = {
	server: {
		url: setEnv("BASE_URL"),
		secrets: {
			aes: setEnv("AES_SECRET"),
			jwt: setEnv("JWT_SECRET"),
			zeroDay: setEnv("ZERODAY_SECRET"),
		},
	},
	sdk: {
		cloudinary: {
			cloudName: setEnv("CLOUDINARY_CLOUDNAME"),
			secretKey: setEnv("CLOUDINARY_SECRET_KEY"),
			apiKey: setEnv("CLOUDINARY_API_KEY"),
		},
		weatherApi: {
			apiKey: setEnv("WEATHER_API_KEY"),
		},
		mongoDB: {
			uri: setEnv("MONGO_URI"),
			database: setEnv("MONGO_DB"),
		},
	},
};

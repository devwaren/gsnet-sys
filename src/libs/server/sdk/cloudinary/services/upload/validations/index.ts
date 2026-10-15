import { schemaServer } from "#/libs/server/schema";

const options = async (data: unknown) => {
	const result = schemaServer.cloudinary.safeParse(data);

	if (!result.success) return;

	return result.data;
};

const file = async (data: unknown) => {
	const result = schemaServer.uploadFile.safeParse(data);

	if (!result.success) return;

	return result.data;
};

export const validate = {
	options,
	file,
};

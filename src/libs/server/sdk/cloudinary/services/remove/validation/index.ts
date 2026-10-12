import { schemaServer } from "#/libs/server/validations";

const publicId = async (data: unknown) => {
	const result = schemaServer.cloudinary.shape.publicId.safeParse(data);

	if (!result.success) return;

	return result.data;
};

const resourceType = async (data: unknown) => {
	const result = schemaServer.cloudinary.shape.resourceType.safeParse(data);

	if (!result.success) return;

	return result.data;
};

export const validate = {
	publicId,
	resourceType,
};

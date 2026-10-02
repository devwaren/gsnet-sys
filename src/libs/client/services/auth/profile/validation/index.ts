import { schema } from "#/libs/shared/validations/index.ts";

const profile = async (data: unknown) => {
	const validateProfile = schema.profile.safeParse(data);

	if (!validateProfile.success) {
		throw new Error("invalid data");
	}

	return validateProfile.data;
};

export const validate = {
	profile,
};

import { schema } from "#/libs/shared/schema";

const payments = async (data: unknown) => {
	return schema.billing.payment.safeParse(data);
};

export { payments };

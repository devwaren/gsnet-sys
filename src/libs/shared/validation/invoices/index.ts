import { schema } from "#/libs/shared/schema";

const invoices = async (data: unknown) => {
	return schema.billing.invoice.safeParse(data);
};

export { invoices };

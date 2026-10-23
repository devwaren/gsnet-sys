import { objectId, z } from "@dev-waren/mongodb";
import { schema } from "#/libs/shared/schema";

const invoiceId = z.object({
	_id: objectId,
});

export const invoices = invoiceId.merge(schema.billing.invoice);

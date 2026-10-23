import type { FormField, z } from "@dev-waren/react-form-kit";
import { schema } from "#/libs/shared/schema";

type Invoice = z.infer<typeof schema.billing.invoice>;

const statusOptions =
	schema.billing.invoice.shape.status._def.innerType.options;

export const fields: FormField<Invoice>[] = [
	{
		name: "customerName",
		type: "text",
		placeholder: "Customer name",
		className: "col-span-2",
	},
	{
		name: "status",
		type: "select",
		items: statusOptions.map((status) => ({
			label: status,
			value: status,
		})),
	},
];

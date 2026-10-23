import { useFormSettings } from "@dev-waren/react-form-kit/hook-form";
import { client } from "#/libs/client/utils";
import { schema } from "#/libs/shared/schema";

const useInvoiceForm = () => {
	return useFormSettings({
		schema: schema.billing.invoice,
		defaultValues: {
			paymentMethod: "Cash",
			status: "Draft",
		},
		onSubmit: (data) => {
			client.log("submitted data:", data);
		},
	});
};

export { useInvoiceForm };

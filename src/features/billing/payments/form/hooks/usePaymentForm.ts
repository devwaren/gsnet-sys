import { useFormSettings } from "@dev-waren/react-form-kit/hook-form";
import { client } from "#/libs/client/utils";
import { schema } from "#/libs/shared/validations";

const usePaymentForm = () => {
	return useFormSettings({
		schema: schema.billing.payment,
		defaultValues: {
			status: "Pending",
		},
		onSubmit: (data) => {
			client.log("submitted data:", data);
		},
	});
};

export { usePaymentForm };

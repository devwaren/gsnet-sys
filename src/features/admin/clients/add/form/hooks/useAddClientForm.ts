import { intlDate } from "@dev-waren/react-form-kit";
import { useFormSettings } from "@dev-waren/react-form-kit/hook-form";
import { schema } from "#/libs/shared/validations";
import { useAddClientEntry } from "./useAddClientEntry";

const useAddClientForm = () => {
	const mutation = useAddClientEntry();
	return useFormSettings({
		schema: schema.customer.client,
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			address: {
				country: "philippines",
				city: "mandaluyong",
			},
			installation: {
				plan: "plan-15mbps",
				installer: "rey pineda",
				date: intlDate,
			},
		},
		clearFields: [
			"firstName",
			"lastName",
			"phone",
			"email",
			"address.zipCode",
			"address.unit",
		],
		onSubmit: (data) => {
			mutation.mutate({ data });
		},
	});
};

export { useAddClientForm };

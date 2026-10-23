import { useFormSettings } from "@dev-waren/react-form-kit/hook-form";
import { client } from "#/libs/client/utils";
import { schema } from "#/libs/shared/schema";
import { usePending } from "#/shared/hooks";
import { useOtpStore } from "#/shared/store/otp";
import { useOtpEntry } from "./useOtpEntry";

const useOtpForm = () => {
	const mutation = useOtpEntry();
	const { clearOtp } = useOtpStore();
	usePending(mutation.isPending);

	return useFormSettings({
		schema: schema.auth.otp,
		defaultValues: {
			otp: "",
		},
		mode: "onChange",
		clearFields: ["otp"],
		onSubmit: (data) => {
			client.log(data);
			clearOtp();
		},
	});
};

export { useOtpForm };

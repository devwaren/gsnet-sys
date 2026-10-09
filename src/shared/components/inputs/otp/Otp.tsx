import { Mapper } from "@dev-waren/react-form-kit";
import { OTPInput } from "./components";
import { useOtp } from "./hooks";

const OTP_DIGITS = ["first", "second", "third", "fourth", "fifth", "sixth"];

export function Otp() {
	const options = useOtp();

	return (
		<Mapper listFor="otp" items={OTP_DIGITS} className="flex gap-3">
			{(_, i) => <OTPInput index={i} options={options} />}
		</Mapper>
	);
}

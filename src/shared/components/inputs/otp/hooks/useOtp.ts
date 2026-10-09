import { useInput } from "@dev-waren/react-form-kit/hook-form";
import { useCallback, useEffect, useRef } from "react";
import { useOtpStore } from "#/shared/store/otp";

const OTP_LENGTH = 6;

const useOtp = () => {
	const inputRef = useRef<Array<HTMLInputElement | null>>([]);
	const { register } = useInput("otp");

	const { clear } = useOtpStore();

	const updateOtp = () => {
		const otp = inputRef.current
			.map((input) => input?.value ?? "")
			.join("")
			.slice(0, OTP_LENGTH);

		register.onChange({
			target: {
				name: "otp",
				value: otp,
			},
		});

		return otp;
	};

	const handleChange = (index: number, value: string) => {
		const digit = value.replace(/\D/g, "").slice(-1);

		if (inputRef.current[index]) {
			inputRef.current[index].value = digit;
		}

		updateOtp();

		if (digit && index < OTP_LENGTH - 1) {
			inputRef.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (
		index: number,
		event: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (event.key === "Backspace" && !event.currentTarget.value && index > 0) {
			inputRef.current[index - 1]?.focus();
		}
	};

	const handlePaste = (event: React.ClipboardEvent) => {
		event.preventDefault();

		const pasted = event.clipboardData
			.getData("text")
			.replace(/\D/g, "")
			.slice(0, OTP_LENGTH);

		pasted.split("").forEach((digit, index) => {
			if (inputRef.current[index]) {
				inputRef.current[index].value = digit;
			}
		});

		updateOtp();

		inputRef.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
	};

	const clearOtp = useCallback(() => {
		inputRef.current.forEach((input) => {
			if (input) {
				input.value = "";
			}
		});

		register.onChange({
			target: {
				name: "otp",
				value: "",
			},
		});

		inputRef.current[0]?.focus();
	}, [register.onChange]);

	useEffect(() => {
		if (clear > 0) {
			clearOtp();
		}
	}, [clear, clearOtp]);

	return {
		register,
		inputRef,
		handleChange,
		handleKeyDown,
		handlePaste,
		clearOtp,
	};
};

export { useOtp };

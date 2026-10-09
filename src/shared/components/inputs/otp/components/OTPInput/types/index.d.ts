import type { UseFormRegisterReturn } from "@dev-waren/react-form-kit";

export type Options = {
	register: UseFormRegisterReturn<"otp" | `otp.${string}`>;
	inputRef: React.RefObject<(HTMLInputElement | null)[]>;
	handleChange: (index: number, value: string) => void;
	handleKeyDown: (
		index: number,
		event: React.KeyboardEvent<HTMLInputElement>,
	) => void;
	handlePaste: (event: React.ClipboardEvent) => void;
	clearOtp: () => void;
};

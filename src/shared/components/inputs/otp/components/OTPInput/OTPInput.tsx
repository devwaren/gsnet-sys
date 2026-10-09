import { styles } from "../../styles";
import type { Options } from "./types";

type Props = {
	options: Options;
	index: number;
};

export default function OTPInput({ options, index }: Props) {
	const { inputRef, handleChange, handleKeyDown, handlePaste } = options;

	return (
		<input
			ref={(element) => {
				inputRef.current[index] = element;
			}}
			type="text"
			inputMode="numeric"
			maxLength={1}
			autoComplete={index === 0 ? "one-time-code" : "off"}
			onChange={(event) => handleChange(index, event.target.value)}
			onKeyDown={(event) => handleKeyDown(index, event)}
			onPaste={handlePaste}
			className={styles.input()}
			aria-label={`OTP digit ${index + 1}`}
		/>
	);
}

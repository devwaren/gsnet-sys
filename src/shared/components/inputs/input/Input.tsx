import { useInput } from "@dev-waren/react-form-kit/hook-form";
import { Eye, EyeClosed } from "lucide-react";
import type { ComponentProps } from "react";
import { usePassword } from "./hooks";
import { styles } from "./styles";

type Props = ComponentProps<"input"> & {
	name: string;
};

export function Input({ className, type, ...props }: Props) {
	const { register, isError, error } = useInput(props.name);
	const { inputType, password, isPassword, handleShowPw } = usePassword(type);

	return (
		<div className={styles.container({ className })}>
			<div className={styles.inputContainer()}>
				<input
					{...props}
					{...register}
					type={inputType}
					className={styles.input()}
				/>

				{isPassword && (
					<button
						type="button"
						onClick={handleShowPw}
						aria-label={password ? "Hide password" : "Show password"}
						className={styles.button()}
					>
						{password ? <Eye size={20} /> : <EyeClosed size={20} />}
					</button>
				)}
			</div>

			{isError && (
				<p role="alert" className={styles.error()}>
					{error}
				</p>
			)}
		</div>
	);
}

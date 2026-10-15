import { useInput } from "@dev-waren/react-form-kit/hook-form";
import type { ComponentProps } from "react";
import { ButtonGenerator } from "./components";
import { useInputGen } from "./components/hooks";
import { styles } from "./styles";

type Props = ComponentProps<"input"> & {
	name: string;
};

export function InputGen({ name, className, type, ...props }: Props) {
	const { register, isError, error } = useInput(name);
	const { inputRef } = useInputGen(name);

	const handleInputRef = (el: HTMLInputElement) => {
		inputRef.current = el;
		register.ref(el);
	};

	return (
		<div className={className}>
			<div className={styles.container()}>
				<div className={styles.inputContainer()}>
					<input
						{...props}
						{...register}
						ref={handleInputRef}
						className={styles.input(className)}
					/>
				</div>

				<ButtonGenerator name={name} />

				{isError && (
					<p role="alert" className={styles.error()}>
						{error}
					</p>
				)}
			</div>
		</div>
	);
}

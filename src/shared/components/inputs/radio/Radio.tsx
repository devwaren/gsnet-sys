import { useInput } from "@dev-waren/react-form-kit/hook-form";
import type { ComponentProps } from "react";
import { styles } from "./styles";

type Props = ComponentProps<"input"> & {
	name: string;
	label?: string;
};

export function Radio({ name, label, className, ...props }: Props) {
	const { register, isError, error } = useInput(name);

	return (
		<div className={styles.container()}>
			<label className={styles.label()}>
				<input
					{...props}
					{...register}
					type="radio"
					className={styles.radio()}
				/>

				{label && <span>{label}</span>}
			</label>

			{isError && (
				<p role="alert" className={styles.error()}>
					{error}
				</p>
			)}
		</div>
	);
}

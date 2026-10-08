import { useInput } from "@dev-waren/react-form-kit/hook-form";
import type { ComponentProps } from "react";
import { styles } from "./styles";

type Props = ComponentProps<"textarea"> & {
	name: string;
};

export function Textarea({ name, className, ...props }: Props) {
	const { register, isError, error } = useInput(name);

	return (
		<div className={styles.container()}>
			<div className={styles.textareaContainer()}>
				<textarea {...props} {...register} className={styles.textarea()} />
			</div>

			{isError && (
				<p role="alert" className={styles.error()}>
					{error}
				</p>
			)}
		</div>
	);
}
